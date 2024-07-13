const { v4: uuidv4 } = require('uuid');
const { md5 } = require('./utils');
const db = require('./db');
const Config = require('./config');

const COOKIE_NAME = Config.COOKIE_NAME;
const COOKIE_MOBILE = Config.COOKIE_MOBILE;
const MAX_AGE = parseInt(Config.MAX_AGE);

//id
async function Generate(res) {
  const cookieId = uuidv4();
  // req.headers['authorization'] = 'Bearer ' + cookieId;
  // res.cookie(COOKIE_NAME, cookieId, { maxAge: MAX_AGE, httpOnly: true });
  return cookieId;
}

//{rowCount} false
async function Delete(req, res) {
  const cookieId = md5(String(req.headers['authorization']));
  // const cookieId = md5(String(req.cookies[COOKIE_NAME]));
  // res.clearCookie(COOKIE_NAME);
  const { command, rowCount } = await db.query(
    `UPDATE "Session" SET offline=true
                                                WHERE offline=false AND login IN
                                                (SELECT login FROM "Session" 
                                                WHERE cookie=$1)`,
    [cookieId]
  );
  if (command == 'UPDATE') return { rowCount };
  else return false;
}

//{staff.json, id} false
async function GetUser(req) {
  if (Config.NODE_ENV === 'development' && Config.FAKE_MODE === 'true') {
    return { role: Config.FAKE_ID_ROLE, id: Config.FAKE_ID_USER };
  }

  if (req && req.headers['authorization']) {
    // if (req && req.cookies && COOKIE_NAME in req.cookies) {
    const token = req.headers['authorization'];
    const { rowCount, rows } = await db.query('SELECT * FROM "fn_Session_Get_User"($1)', [
      md5(String(token)),
      // md5(String(req.cookies[COOKIE_NAME])),
    ]);
    //  console.log("fn_Session_Get_User",rowCount, rows)
    if (rowCount) return { ...rows[0] };
  }
  return false;
}

//true false
async function Check(req) {
  const user = await GetUser(req);
  req.user = user;
  if (user) {
    return true;
  } else {
    return false;
  }
}

//true false
async function Login(req, res, login, id, role, token = false) {
  // if cookies does not exist then save generated cookieId to res.cookies then add into session
  const isMobile = String(req.cookies[COOKIE_MOBILE]) == 'true' ? true : false;
  const cookieIdToken = token ? token : await Generate(res);
  // const cookieIdToken = await Generate(res);
  const cookieId = md5(cookieIdToken);
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',').shift() : req.ip;
  // console.log("headers",req.headers)
  const { rows } = await db.query('SELECT  EXISTS( select 1 FROM "Session" where login =$1)', [
    String(login),
  ]);

  if (rows[0].exists) {
    const { rowCount: updated } = await db.query(
      `UPDATE "Session" 
                                             SET offline=false, 
                                                 last_action=current_timestamp, 
                                                 cookie=$2, 
                                                 id_user=$3, 
                                                 is_mobile=$4,
                                                 id_role=$5
                                             WHERE login=$1`,
      [String(login), cookieId, id, isMobile, role]
    );
    if (updated) await LoginLog(String(login), id, role, isMobile, ip);
    return cookieIdToken;
    // return !!updated;
  } else {
    // console.log(String(req.cookies['isMobile']), isMobile);
    const { rowCount: inserted } = await db.query(
      `
            INSERT INTO "Session" (cookie, login, id_user, id_role, last_action, is_mobile)
            VALUES ($1, $2, $3, $4, current_timestamp, $5)`,
      [cookieId, login, id, role, isMobile]
    );
    // console.log(inserted);
    if (inserted) await LoginLog(String(login), id, role, isMobile, ip);
    return cookieIdToken;
    // return !!inserted;
  }
}

async function LoginLog(login, id, role, isMobile, ip) {
  const { rowCount } = await db.query(
    `
        INSERT INTO "Session_log" (login, id_user,id_role, log_time, is_mobile, ip)
        VALUES ($1, $2, $3, current_timestamp, $4, $5)`,
    [login, id, role, isMobile, ip]
  );

  if (rowCount) return true;
  else return false;
}

module.exports.LOGIN = Login;
module.exports.LOGOUT = Delete;
module.exports.CHECK_PERM = Check;
module.exports.GET_USER = GetUser;
module.exports.COOKIE_NAME = COOKIE_NAME;
