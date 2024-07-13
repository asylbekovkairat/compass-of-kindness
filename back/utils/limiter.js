/* eslint-disable no-unused-vars */
const { RateLimiterMemory } = require('rate-limiter-flexible');
const { send } = require('../modules/send');
const logger = require('../utils/logger');

const maxWrongAttemptsLogin = process.env.LOGIN_LIMIT_ATTEMPTS || 5;
const maxWrongAttemptsPerDay = process.env.LOGIN_DAY_LIMIT_ATTEMPTS || 50;
const maxWrongAttemptsAPI = process.env.API_LIMIT_ATTEMPTS || 250;
const durationLogin = process.env.LOGIN_DURATION_MS || 180;
const durationPerDay = process.env.LOGIN_DAY_DURATION_HR || 24;
const durationAPI = process.env.API_DURATION_MS || 100;
const blockLogin = process.env.LOGIN_BLOCK_MS || 180;
const blockPerDay = process.env.LOGIN_DAY_BLOCK_HR || 24;

const rateLimiterLogin = new RateLimiterMemory({
  points: maxWrongAttemptsLogin,
  duration: durationLogin, // Per 180 seconds
  blockDuration: blockLogin, // Block for 1 minute
});
const rateLimiterLoginPerDay = new RateLimiterMemory({
  points: maxWrongAttemptsPerDay,
  duration: 60 * 60 * durationPerDay, // Per 1 day
  blockDuration: 60 * 60 * blockPerDay, // Block for 1 day
});
const rateLimiterAPI = new RateLimiterMemory({
  points: 100,
  duration: 100, // Per 100 seconds
  inmemoryBlockDuration: 1,
});

const rateLimiterMiddleware = (req, res, next) => {
  const key = req.body && req.body.login ? req.body.login : req.ip;

  logger.info(`${JSON.stringify({ maxWrongAttemptsAPI, key, rateLimiterAPI })}`);
  logger.info(JSON.stringify(rateLimiterAPI._memoryStorage));

  rateLimiterAPI
    .consume(key, maxWrongAttemptsAPI)
    .then((e) => {
      logger.info(`response ${JSON.stringify(e)}`);

      next();
    })
    .catch((error) => {
      logger.error(JSON.stringify(error));
      return send(
        res,
        false,
        'Вы отправили слишком много запросов. Пожалуйста, подождите немного, а затем повторите попытку!',
        true,
        429
      );
    });
  // }
};

module.exports = rateLimiterMiddleware;
