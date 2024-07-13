const db = require('./db');

const logDb = async (message, type, action, id_user, id_role, json) => {
  await db.query(
    `INSERT INTO public.logs
  (text_log, type_log, action_name, id_user, id_role, json_log)
  VALUES(  $1, $2, $3, $4, $5, $6);
  `,
    [message, type, action, id_user, id_role, json]
  );
  return 1;
};

module.exports = { logDb };
