const MEASUREMENT_ID = 'G-M76L0HBC81';
const PRODUCTION_HOSTS = new Set(['timyooapparel.com', 'www.timyooapparel.com']);
const initializedWindows = new WeakSet<Window>();

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (command: string, target: string | Date, properties?: Record<string, unknown>) => void;
};

export function initializeAnalytics(browser: AnalyticsWindow = window, page: Document = document) {
  if (!PRODUCTION_HOSTS.has(browser.location.hostname) || initializedWindows.has(browser)) {
    return;
  }

  initializedWindows.add(browser);
  const dataLayer = browser.dataLayer = browser.dataLayer || [];
  browser.gtag = browser.gtag || function () { dataLayer.push(arguments); };
  browser.gtag('js', new Date());
  browser.gtag('config', MEASUREMENT_ID, {
    send_page_view: true,
    // Keep the landing URL (including UTMs) and actual referrer for GA4 attribution.
    page_location: browser.location.href,
    page_referrer: page.referrer,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = page.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  page.head.appendChild(script);
}

export function trackEmailClick(
  link: HTMLAnchorElement,
  openEmail: () => void,
  browser: AnalyticsWindow = window,
) {
  if (!PRODUCTION_HOSTS.has(browser.location.hostname) || !browser.gtag) {
    openEmail();
    return;
  }

  let opened = false;
  let timeoutId: number;
  const complete = () => {
    if (opened) return;
    opened = true;
    browser.clearTimeout(timeoutId);
    openEmail();
  };

  // The mail link must still work if analytics is blocked or never calls back.
  timeoutId = browser.setTimeout(complete, 500);
  try {
    browser.gtag('event', 'email_click', {
      send_to: MEASUREMENT_ID,
      link_id: link.id,
      link_url: link.getAttribute('href') ?? '',
      link_text: link.textContent?.trim() ?? '',
      page_path: browser.location.pathname,
      event_callback: complete,
      event_timeout: 500,
    });
  } catch {
    complete();
  }
}
