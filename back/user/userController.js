/* eslint-disable no-unused-vars */
const { send, sendError, sendSuccess } = require('../utils/send');
const validate = require('../utils/validator');
const COOKIE = require('../utils/cookie');
const Utils = require('../utils/utils');
const TokenService = require('../utils/jwt');
const UserSchema = require('./userSchema');
const LangService = require('../services/LangService');
const UserService = require('./userService');
const Config = require('../utils/config');
const logger = require('../utils/logger');
class UserController {
  async login(req, res) {
    const isValid = validate(req.body, UserSchema.userSchema);
    if (!isValid) {
      return sendError(res, req.t('inValidFormat'));
    }

    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const { login, password } = req.body;

    // const id = await UserService.login(String(login), password, is_staff);
    const user = await UserService.login(langId, String(login), password);
    if (user) {
      // idUser;
      // idRole;
      // idOrganization;
      // role;
      const exp = Date.now() + parseInt(Config.JWT_EXPIRE_HOURS) * 60 * 60 * 1000;
      const token = TokenService.generateAccessToken({
        id: user.idUser,
        org: user.idOrganization,
        role: [user.role],
        type: user.idRole,
        pin: user.pin,
        s: user.surname,
        n: user.name,
        p: user.patronymic,
        okpo: user.okpo,
        orgTypeId: user.orgTypeId,
        exp,
      });
      if (!token) return sendError(res, 'tokenGenerateError');
      const tokenBearer = 'Bearer ' + token;
      // const logged = await COOKIE.LOGIN(req, res, login, user.idUser, user.idRole, tokenBearer);

      // if (logged && user) {
      if (user) {
        // return sendSuccess(res, { id, is_staff, token: logged }, req.t('success'));
        return send(
          res,
          {
            authState: {
              id: user.idUser,
              org: user.idOrganization,
              role: [user.role],
              type: user.idRole,
              pin: user.pin,
              s: user.surname,
              n: user.name,
              p: user.patronymic,
              okpo: user.okpo,
              orgTypeId: user.orgTypeId,
              exp,
            },
            token: token,
            tokenType: 'Bearer',
            // expiresIn: parseInt(10) * 60, // minutes
            expiresIn: parseInt(Config.JWT_EXPIRE_HOURS) * 60, // minutes
          },
          'success',
          false,
          200
        );
      }
    }
    return sendError(res, req.t('unauth'), 401);
  }

  async check(req, res) {
    const token = req.headers['authorization'];

    if (!token) {
      return sendError(res, 'noToken', 401);
    }
    const userData = TokenService.getTokenData(token);
    const rawToken = String(token).split(' ')[1];

    // const dbAuthCheck = await COOKIE.CHECK_PERM(req);

    // if (userData && userData.exp > new Date() && dbAuthCheck)
    if (userData && userData.exp > new Date())
      return send(
        res,
        {
          authState: {
            id: userData.id,
            org: userData.org,
            role: userData.role,
            type: userData.type,
            pin: userData.pin,
            s: userData.s,
            n: userData.n,
            p: userData.p,
            okpo: userData.okpo,
            orgTypeId: userData.orgTypeId,
            exp: userData.exp,
          },
          token: rawToken,
          tokenType: 'Bearer',
          expiresIn: parseInt((userData.exp - Date.now()) / 60000), //minutes
        },
        'success',
        false,
        200
      );

    return sendError(res, 'error', 401);
  }

  async logout(req, res) {
    // await COOKIE.LOGOUT(req, res);

    // res.cookie(Config.COOKIE_NAME, "tokenWillBeDeleted", {
    //   maxAge: 0,
    //   httpOnly: true,
    //   Path: Config.COOKIE_PATH,
    //   SameSite: "None",
    // });
    return sendSuccess(res, true, req.t('success'));
  }
}

module.exports = new UserController();
