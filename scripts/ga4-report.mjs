import { execFileSync } from 'node:child_process';
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SOURCE_DIMENSIONS = ['sessionDefaultChannelGroup', 'sessionSourceMedium', 'sessionCampaignName'];
const TRAFFIC_METRICS = ['totalUsers', 'activeUsers', 'sessions', 'screenPageViews'];

export function buildReports(days = 7, includeToday = false) {
  if (!Number.isInteger(days) || days < 1 || days > 365) {
    throw new Error('--days must be an integer between 1 and 365.');
  }
  const start = days - (includeToday ? 1 : 0);
  const dateRanges = [{ startDate: start === 0 ? 'today' : `${start}daysAgo`, endDate: includeToday ? 'today' : 'yesterday' }];
  const report = (dimensions, metrics = TRAFFIC_METRICS, extra = {}) => ({
    dateRanges,
    dimensions: dimensions.map((name) => ({ name })),
    metrics: metrics.map((name) => ({ name })),
    limit: '10000',
    ...extra,
  });
  return {
    overview: report([]),
    daily: report(['date'], TRAFFIC_METRICS, { orderBys: [{ dimension: { dimensionName: 'date' } }] }),
    countries: report(['country']),
    sources: report(SOURCE_DIMENSIONS, TRAFFIC_METRICS, { orderBys: [{ metric: { metricName: 'sessions' }, desc: true }] }),
    emailClicksBySource: report(SOURCE_DIMENSIONS, ['eventCount', 'totalUsers'], {
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { matchType: 'EXACT', value: 'email_click' } } },
    }),
  };
}

export function parseReport(report) {
  const dimensions = (report.dimensionHeaders ?? []).map(({ name }) => name);
  const metrics = (report.metricHeaders ?? []).map(({ name }) => name);
  const rows = (report.rows ?? []).map((row) => Object.fromEntries([
    ...dimensions.map((name, index) => [name, row.dimensionValues[index].value]),
    ...metrics.map((name, index) => [name, Number(row.metricValues[index].value)]),
  ]));
  return {
    rows,
    rowCount: report.rowCount ?? 0,
    truncated: (report.rowCount ?? 0) > rows.length,
    metadata: report.metadata,
  };
}

function request(url, body, contentType, token) {
  // Pass credentials through stdin, never process arguments, files or logs.
  const config = [
    `url = ${JSON.stringify(url)}`,
    'request = "POST"',
    `header = ${JSON.stringify(`Content-Type: ${contentType}`)}`,
    ...(token ? [`header = ${JSON.stringify(`Authorization: Bearer ${token}`)}`] : []),
    `data = ${JSON.stringify(body)}`,
  ].join('\n');
  let response;
  try {
    response = execFileSync('curl', ['--disable', '--silent', '--show-error', '--max-time', '45', '--config', '-', '--write-out', '\n%{http_code}'], {
      input: config,
      encoding: 'utf8',
      maxBuffer: 16 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch {
    throw new Error(`Could not reach ${new URL(url).hostname}. Check connectivity / HTTPS_PROXY and retry.`);
  }
  const separator = response.lastIndexOf('\n');
  const status = Number(response.slice(separator + 1));
  if (status < 200 || status >= 300) {
    throw new Error(`${new URL(url).hostname} returned HTTP ${status}. Check API access and service-account permissions.`);
  }
  try {
    return JSON.parse(response.slice(0, separator));
  } catch {
    throw new Error(`${new URL(url).hostname} did not return valid JSON.`);
  }
}

function accessToken(credentialsPath) {
  let credentials;
  try {
    credentials = JSON.parse(readFileSync(credentialsPath, 'utf8'));
    if (credentials.type !== 'service_account' || !credentials.client_email || !credentials.private_key) throw new Error();
  } catch {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS must point to a valid local service-account JSON file.');
  }
  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const payload = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  let signature;
  try {
    signature = createSign('RSA-SHA256').update(payload).sign(credentials.private_key, 'base64url');
  } catch {
    throw new Error('Could not sign the service-account request. Check the local private key.');
  }
  const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${payload}.${signature}` });
  const result = request(TOKEN_URL, body.toString(), 'application/x-www-form-urlencoded');
  if (!result.access_token) throw new Error('Google did not return an access token.');
  return result.access_token;
}

function main() {
  const { values } = parseArgs({ options: {
    days: { type: 'string', default: '7' },
    'include-today': { type: 'boolean', default: false },
    help: { type: 'boolean', default: false },
  } });
  if (values.help) {
    console.log('Usage: npm run analytics:report -- --days 7 [--include-today]\nRequired: GOOGLE_APPLICATION_CREDENTIALS\nOptional: GA4_PROPERTY_ID (default 543672900), HTTPS_PROXY\nDefault: last 7 complete days in the GA4 property timezone. Output: JSON.');
    return;
  }
  const reports = buildReports(Number(values.days), values['include-today']);
  const property = process.env.GA4_PROPERTY_ID || '543672900';
  if (!/^\d+$/.test(property)) throw new Error('GA4_PROPERTY_ID must contain only digits.');
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) throw new Error('Set GOOGLE_APPLICATION_CREDENTIALS to the local service-account JSON path.');
  const token = accessToken(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const response = request(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:batchRunReports`, JSON.stringify({ requests: Object.values(reports) }), 'application/json', token);
  if (response.reports?.length !== Object.keys(reports).length) throw new Error('Google returned an incomplete batch of reports.');
  console.log(JSON.stringify({
    property,
    queriedAt: new Date().toISOString(),
    dateRange: reports.overview.dateRanges[0],
    ...Object.fromEntries(Object.keys(reports).map((name, index) => [name, parseReport(response.reports[index])])),
  }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { main(); } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
