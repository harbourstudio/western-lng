export const getBaseUrl = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'https://western-lng.vercel.app/';
};
