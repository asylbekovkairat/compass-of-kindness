const db = require('../utils/db');
const { md5 } = require('../utils/utils');
const Config = require('../utils//config');
const logger = require('../utils/logger');
const JWT = require('../utils/jwt');

async function getUser(cookies) {
  try {
    if (Config.NODE_ENV === 'development' && Config.FAKE_AUTH_MODE === 'true') {
      const FAKE_ID = parseInt(Config.FAKE_ID) || 12;
      const FAKE_STAFF = Config.FAKE_IS_STAFF === 'true';
      return { id: FAKE_ID, staff: FAKE_STAFF };
    }
    const { rowCount, rows } = await db.query('SELECT * FROM "fn_Session_Get_User"($1)', [
      md5(String(cookies)),
    ]);
    if (rowCount) return { ...rows[0] };

    return false;
  } catch (err) {
    logger.error(`error getUser ${err.message}`);
    return false;
  }
}

async function getTokenUser(token) {
  try {
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
}

module.exports = {
  getUser,
  getTokenUser,
};
