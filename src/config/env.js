const required = (key) => {
  const v = import.meta.env[key];
  if (v === undefined || v === '') throw new Error(`Missing env: ${key}`);
  return v;
};

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL'),
  aiEnabled: import.meta.env.VITE_AI_ENABLED === 'true',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || null,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
