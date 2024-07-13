const jwt = require('jsonwebtoken');
const crypto = require('./crypto');
const logger = require('./logger');
const { JWT_ACCESS_SECRET, JWT_EXPIRE_HOURS, JWT_EXTERNAL_ACCESS_SECRET } = require('./config');

const generateAccessToken = (data) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ data: crypto.encrypt(JSON.stringify(data)) }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_EXPIRE_HOURS,
  });
};

const generateLinkToken = (data, expires = 600) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign({ data }, JWT_ACCESS_SECRET, {
    expiresIn: expires || JWT_EXPIRE_HOURS,
  });
};

const verifyAccessToken = (token) => {
  try {
    const rawToken = String(token).split(' ');
    if (rawToken[0] != 'Bearer' || rawToken[1].length < 20) return false;
    const decodedData = jwt.verify(rawToken[1], JWT_ACCESS_SECRET);
    if (!decodedData) {
      return false;
    }
    return decodedData;
  } catch (e) {
    logger.error(JSON.stringify(e));
    return false;
  }
};

const getTokenData = (token) => {
  try {
    const rawToken = String(token).split(' ');
    if (rawToken[0] != 'Bearer' || rawToken[1].length < 20) {
      return false;
    }
    const decodedData = jwt.verify(rawToken[1], JWT_ACCESS_SECRET);

    if (!decodedData) {
      return false;
    }

    const result = JSON.parse(crypto.decrypt(decodedData.data));
    return { ...result };
  } catch (e) {
    logger.error(JSON.stringify(e));
    return false;
  }
};

const getExternalTokenData = (token) => {
  try {
    const decodedData = jwt.verify(token, JWT_EXTERNAL_ACCESS_SECRET);

    if (!decodedData) {
      return false;
    }
    return { ...decodedData };
  } catch (e) {
    logger.error(JSON.stringify(e));
    return false;
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  getTokenData,
  generateLinkToken,
  getExternalTokenData,
};
