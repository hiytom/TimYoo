import assert from 'node:assert/strict';
import test from 'node:test';
import { initializeAnalytics, trackEmailClick } from '../src/utils/analytics.ts';

function fixture(href = 'https://www.timyooapparel.com/', referrer = '') {
  const scripts = [];
  const timers = new Map();
  let timerId = 0;
  const browser = {
    location: new URL(href),
    setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  };
  const page = {
    referrer,
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
  };
  return { browser, page, scripts, timers };
}

test('initializes one pageview, preserving UTM parameters and the external referrer', () => {
  const href = 'https://www.timyooapparel.com/?utm_source=linkedin&utm_medium=social&utm_campaign=company_profile';
  const f = fixture(href, 'https://www.linkedin.com/');
  initializeAnalytics(f.browser, f.page);
  initializeAnalytics(f.browser, f.page);
  const entries = f.browser.dataLayer.map((args) => Array.from(args));
  assert.equal(entries.length, 2);
  assert.equal(entries[0][0], 'js');
  assert.equal(entries[1][0], 'config');
  assert.equal(entries[1][1], 'G-M76L0HBC81');
  assert.equal(entries[1][2].send_page_view, true);
  assert.equal(entries[1][2].page_location, href);
  assert.equal(entries[1][2].page_referrer, f.page.referrer);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-M76L0HBC81');
});

test('search, referral and direct visits are left to GA4, without invented sources', () => {
  for (const referrer of ['', 'https://www.google.com/', 'https://chatgpt.com/', 'https://www.timyooapparel.com/']) {
    const f = fixture('https://timyooapparel.com/products/casuals/', referrer);
    initializeAnalytics(f.browser, f.page);
    const properties = f.browser.dataLayer[1][2];
    assert.equal(properties.page_referrer, referrer);
    assert.equal(properties.campaign_source, undefined);
    assert.equal(properties.campaign_medium, undefined);
  }
});

test('local and preview hosts do not load GA4 or record clicks', () => {
  for (const host of ['localhost', '127.0.0.1', '192.168.1.10', 'timyoo.pages.dev', 'www.timyooapparel.com.example.org']) {
    const f = fixture(`http://${host}/`);
    initializeAnalytics(f.browser, f.page);
    assert.equal(f.scripts.length, 0);
    assert.equal(f.browser.dataLayer, undefined);
    let opened = 0;
    f.browser.gtag = () => assert.fail('Must not track a local click');
    trackEmailClick({}, () => opened++, f.browser);
    assert.equal(opened, 1);
  }
});

const link = {
  id: 'footer-contact-email',
  getAttribute: () => 'mailto:info@example.com',
  textContent: ' info@example.com ',
};

test('email click uses the same GA4 stream and opens the mail client only once', () => {
  const f = fixture();
  initializeAnalytics(f.browser, f.page);
  f.browser.zaraz = { track: () => assert.fail('Do not split attribution across collectors') };
  let opened = 0;
  trackEmailClick(link, () => opened++, f.browser);
  const event = Array.from(f.browser.dataLayer[2]);
  assert.equal(event[1], 'email_click');
  assert.equal(event[2].send_to, 'G-M76L0HBC81');
  assert.equal(event[2].link_id, link.id);
  assert.equal(event[2].page_path, '/');
  const fallback = [...f.timers.values()][0];
  event[2].event_callback();
  fallback();
  event[2].event_callback();
  assert.equal(opened, 1);
  assert.equal(f.timers.size, 0);
});

test('blocked analytics, missing analytics, and errors do not break mail links', () => {
  for (const mode of ['blocked', 'missing', 'throws']) {
    const f = fixture();
    if (mode !== 'missing') initializeAnalytics(f.browser, f.page);
    if (mode === 'throws') f.browser.gtag = () => { throw new Error('blocked'); };
    let opened = 0;
    trackEmailClick(link, () => opened++, f.browser);
    for (const callback of f.timers.values()) callback();
    assert.equal(opened, 1, mode);
  }
});
