export const config = { runtime: 'edge' };

export default async function handler(req) {
  const u = new URL(req.url);
  const p = u.searchParams.get('p') || '';
  u.searchParams.delete('p');
  const qs = u.searchParams.toString();
  const target = 'https://api.telegram.org/' + p + (qs ? '?' + qs : '');
  const headers = new Headers(req.headers);
  headers.delete('host');
  const init = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.arrayBuffer();
  }
  return fetch(target, init);
}
