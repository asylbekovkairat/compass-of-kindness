const { Pool } = require('pg');
const SentryInstance = require('./sentry');
const Config = require('./config');
const logger = require('./logger');

const pool = new Pool({
  host: Config.DBSERVER,
  port: Config.DBPORT,
  database: Config.DBNAME,
  user: Config.DBUSER,
  password: Config.DBPASS,
  max: parseInt(Config.DBPG_MAX_CONNECTIONS),
  idleTimeoutMillis: parseInt(Config.DBPG_IDLETIMEOUTMILLLIS),
  connectionTimeoutMillis: parseInt(Config.DBPG_CONNECTIONTIMEOUTMILLES),
});

async function connectionCheck() {
  try {
    return pool
      .query('select 1 as answer', [])
      .then((res) => {
        logger.info(`Connected to PG => ${res.rows[0] && res.rows[0].answer == 1}`);
      }) // brianc
      .catch((err) => {
        logger.error(`Error executing query ${JSON.stringify(err.stack)}`);
        if (process.env.NODE_ENV === 'production') {
          SentryInstance.Sentry.captureException(err);
        }
        throw new Error(err);
      });
  } catch (err) {
    logger.error(`PG ERROR => `);
    console.log(err);
    return { rows: [], rowCount: 0, error: err.message };
  }
}
connectionCheck();

async function query(text, params) {
  try {
    if (process.env.NODE_ENV === 'development') {
      logger.info(`PG query: \n  Query: ${text} \n  Params: [${params}]`);
    }
    const res = await pool.query(text, params);
    return { rows: res.rows, rowCount: res.rowCount, error: false };
  } catch (err) {
    logger.error(`PG ERROR => `);
    console.log(err);
    logger.debug(`PG query: \n  Query: ${text} \n  Params: `);
    console.log(params);
    SentryInstance.Sentry.captureException(err);
    return { rows: [], rowCount: 0, error: err.message };
  }
}

module.exports = {
  query: (text, params) => query(text, params),
  callback: (text, params, callback) => pool.query(text, params, callback),
};
