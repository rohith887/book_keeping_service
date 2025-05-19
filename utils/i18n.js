const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'hi'],
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/translation.json'),
    },
  });

module.exports = i18next;
