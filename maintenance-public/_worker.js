export default {
  async fetch(request, env) {
    const page = await env.ASSETS.fetch(new URL('/', request.url));
    return new Response(request.method === 'HEAD' ? null : page.body, {
      status: 503,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': '3600',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  },
};
