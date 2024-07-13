const db = require('../utils/db');
const logger = require('../utils/logger');
const UserService = require('../services/UserService');

const log = async (req, action_name, value) => {
  const agent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.ip;
  const token = req.headers['authorization'];
  const user = await UserService.getTokenUser(token);
  const role = user.role[0] || 'anonim';
  const id_user = user.id || 0;

  const result = await db.query(
    `INSERT INTO public.app_log
  (action_name, role, id_user, value, log_time, agent, ip)
  VALUES(  $1, $2, $3, $4::jsonb, current_timestamp, $5, $6);
  `,
    [action_name, role, id_user, JSON.stringify(value), JSON.stringify(agent), ip]
  );
  logger.debug(`public.app_log ${JSON.stringify(result)}`);
  return 1;
};

module.exports = {
  log,
};
