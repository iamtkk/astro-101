/** @type {import('astro-i18next').AstroI18nextConfig} */
export default {
  defaultLocale: 'en',
  locales: ['en', 'kr'],
  load: ['server', 'client'],
  i18nextServer: {
    debug: false,
  },
  i18nextClient: {
    debug: false,
  },
  i18nextServerPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
  i18nextClientPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
};
