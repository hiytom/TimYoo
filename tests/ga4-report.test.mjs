import assert from 'node:assert/strict';
import test from 'node:test';
import { buildReports, parseReport } from '../scripts/ga4-report.mjs';

test('seven days means seven complete dates, with an explicit option to include today', () => {
  assert.deepEqual(buildReports().overview.dateRanges, [{ startDate: '7daysAgo', endDate: 'yesterday' }]);
  assert.deepEqual(buildReports(7, true).overview.dateRanges, [{ startDate: '6daysAgo', endDate: 'today' }]);
  assert.deepEqual(buildReports(1, true).overview.dateRanges, [{ startDate: 'today', endDate: 'today' }]);
  for (const days of [0, -1, NaN, 1.5, 366]) assert.throws(() => buildReports(days));
});

test('traffic and email reports use matching session-scoped attribution', () => {
  const reports = buildReports();
  assert.equal(Object.keys(reports).length, 5);
  assert.deepEqual(reports.sources.dimensions, reports.emailClicksBySource.dimensions);
  assert.equal(reports.emailClicksBySource.dimensionFilter.filter.fieldName, 'eventName');
  assert.equal(reports.emailClicksBySource.dimensionFilter.filter.stringFilter.value, 'email_click');
  assert.equal(reports.emailClicksBySource.metrics[0].name, 'eventCount');
  assert.equal(reports.overview.dimensions.length, 0);
});

test('empty reports stay empty and sampling / threshold / truncation metadata is retained', () => {
  assert.deepEqual(parseReport({}).rows, []);
  const report = parseReport({
    dimensionHeaders: [{ name: 'sessionSourceMedium' }],
    metricHeaders: [{ name: 'sessions' }],
    rows: [{ dimensionValues: [{ value: 'google / organic' }], metricValues: [{ value: '3' }] }],
    rowCount: 2,
    metadata: { subjectToThresholding: true, timeZone: 'Asia/Shanghai' },
  });
  assert.deepEqual(report.rows, [{ sessionSourceMedium: 'google / organic', sessions: 3 }]);
  assert.equal(report.truncated, true);
  assert.equal(report.metadata.subjectToThresholding, true);
});
