// Central API configuration and helpers
// Normalize dev toggle (accept boolean true or string 'true')
const DEV_TOGGLE =
  String(import.meta.env.VITE_DEV_MODE_TOGGLE).toLowerCase() === 'true' ||
  import.meta.env.VITE_DEV_MODE_TOGGLE === true;

const PROD_ENV = import.meta.env.VITE_API_BASE_URL_PROD;
const DEV_ENV = import.meta.env.VITE_API_BASE_URL_DEV;

export let API_BASE = DEV_TOGGLE ? DEV_ENV : PROD_ENV;

if (!API_BASE) {
  if (import.meta.env && import.meta.env.DEV) {
    API_BASE = 'http://localhost:1337';
  } else if (typeof window !== 'undefined' && window.location && window.location.origin) {
    API_BASE = window.location.origin;
  }
}

export function getImageUrl(img) {
  if (!img) return null;
  if (typeof img === 'string') return img;
  const base = API_BASE || '';
  const url = img?.url || img?.formats?.medium?.url || img?.formats?.small?.url || img?.formats?.thumbnail?.url || null;
  if (!url) return null;
  return url.startsWith('http') ? url : `${base}${url}`;
}

export default API_BASE;
