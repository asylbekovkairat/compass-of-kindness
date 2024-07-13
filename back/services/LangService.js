const logger = require('../utils/logger');

async function getLangId(resolvedLanguage) {
  try {
    let id = 1;
    switch (resolvedLanguage) {
      case 'ru':
        id = 1;
        break;
      case 'ky':
        id = 2;
        break;
      case 'en':
        id = 3;
        break;
      default:
        id = 1;
        break;
    }
    return id;
  } catch (err) {
    logger.error(`error getLangId ${err.message}`);
    return 1;
  }
}
async function langIdNext(req, res, next) {
  try {
    const lang = req.i18n.resolvedLanguage;
    let id = 1;
    switch (lang) {
      case 'ru':
        id = 1;
        break;
      case 'ky':
        id = 2;
        break;
      case 'en':
        id = 3;
        break;
      default:
        id = 1;
        break;
    }
    req.langId = id;
    next();
  } catch (err) {
    req.langId = 1;
    next();
  }
}

module.exports = {
  getLangId,
  langIdNext,
};
