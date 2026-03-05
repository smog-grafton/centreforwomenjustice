/**
 * API base URL. In production (e.g. Vercel) set NEXT_PUBLIC_API_URL.
 * Local dev falls back to http://127.0.0.1:8000 when env is unset.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : '');
