const COOKIE = require('../utils/cookie');
const { send, sendError, sendSuccess } = require('../utils/send');
const Config = require('../utils//config');
const JWT = require('../utils/jwt');
const logger = require('../utils/logger');

const returnMessage = (resp, message, status = 401) => send(resp, false, message, true, status);

async function checkSession(req, res, next) {
  if (Config.NODE_ENV === 'development' && Config.FAKE_AUTH_MODE === 'true') {
    // development FAKE_ID
    next();
  } else {
    const IsAuthenticated = await COOKIE.CHECK_PERM(req);
    if (IsAuthenticated) {
      next();
    } else {
      return sendError(res, req.t('token.noAuth'), 401);
    }
  }
}

const isSuperAdminToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['admin']);
};
const isMinistryAdminToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['adminMES', 'adminMH', 'adminME']);
};
const isMESToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['adminMES']);
};
const isMHToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['adminMH']);
};
const isMEToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['adminME']);
};
const isMinistryEmpToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['employeeMES', 'employeeMH', 'employeeME']);
};
const isEmpMESToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['employeeMES']);
};
const isEmpMHToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['employeeMH']);
};
const isEmpMEToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['employeeME']);
};
const isEmpToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [
    'adminMES',
    'adminMH',
    'adminME',
    'employeeMES',
    'employeeMH',
    'employeeME',
  ]);
};
const isAcceleratorToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, ['accelerator']);
};
const isValidToken = async (req, resp, next) => {
  return await checkToken(req, resp, next, [
    'adminMES',
    'adminMH',
    'adminME',
    'employeeMES',
    'employeeMH',
    'employeeME',
    'accelerator',
  ]);
};
const checkToken = async (req, resp, next, roles) => {
  try {
    if (Config.NODE_ENV === 'development' && Config.FAKE_AUTH_MODE === 'true') {
      next();
    }

    const token = req.headers['authorization'];
    // const token = req.cookies[Config.COOKIE_NAME];
    req.token = token;

    if (!!token) {
      const decodedData = JWT.getTokenData(token);
      if (Config.NODE_ENV === 'development') {
        logger.debug({ decodedData });
      }
      if (token && decodedData && decodedData.exp > new Date()) {
        if (roles.some((x) => decodedData.role.includes(x))) {
          req.user = decodedData;
          return next();
        }
        return returnMessage(resp, 'Permission denied', 403);
      } else {
        return returnMessage(resp, 'token invalid');
      }
    } else {
      // console.log("token not found", token);
      return returnMessage(resp, 'token not found');
    }
  } catch (err) {
    logger.error(`CheckUser error catch => ${JSON.stringify(err)}`);
    return returnMessage(resp, 'token expired');
  }
};

const getTokenData = async (req) => {
  try {
    const token = req.headers['authorization'];
    // const token = req.cookies[Config.COOKIE_NAME];

    if (!!token) {
      const decodedData = JWT.getTokenData(token);
      if (token && decodedData && decodedData.exp > new Date()) {
        return decodedData;
      }
    }

    return false;
  } catch (err) {
    logger.error(`getTokenData error catch => ${JSON.stringify(err)}`);
    return false;
  }
};
module.exports = {
  checkSession,
  getTokenData,

  isSuperAdminToken,
  isMinistryAdminToken,
  isMinistryEmpToken,
  isMESToken,
  isMHToken,
  isMEToken,
  isEmpMESToken,
  isEmpMHToken,
  isEmpMEToken,
  isEmpToken,
  isAcceleratorToken,
  isValidToken,
};
