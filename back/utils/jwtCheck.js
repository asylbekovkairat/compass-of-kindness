const Config = require('./config');
const UserService = require('../user/userService');
const logger = require('./logger');
const { getTokenData } = require('./jwt');

const ROLES = {
  ADMIN: 1,
  MINISTRY: 2,
  EMPLOYEE: 3,
  TYPOGRAPHY: 4,
  SUPERVISOR: 5,
  RAYONO: 6,
  ORGANIZATION: 6,
};

const returnMessage = (resp, message) => resp.status(401).json({ message, error: true, data: false });

const validateToken = async (req, resp, requiredRoles) => {
  try {
    const token = req.headers['authorization'];
    req.token = token;

    if (!token) {
      return returnMessage(resp, 'Token not found');
    }

    const decodedData = getTokenData(token);
    const reqUserFromDB = await UserService.getUserById(decodedData.id);

    if (decodedData.type !== reqUserFromDB.id_role) {
      return returnMessage(resp, 'Returned role is not equal');
    }

    if (Config.NODE_ENV === 'development') {
      logger.debug({ decodedData });
    }

    if (!decodedData || decodedData.exp <= new Date()) {
      return returnMessage(resp, 'Token expired or invalid');
    }

    if (requiredRoles !== null && !requiredRoles.includes(decodedData.type)) {
      return returnMessage(resp, 'Permission denied');
    }

    req.user = decodedData;
    return true;
  } catch (err) {
    logger.error(`CheckUser error catch => ${err}`);
    return returnMessage(resp, 'Unexpected error');
  }
};

const isAuth = async (req, resp, next) => {
  const roles = null;
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

const roleGuard = (roles) => async (req, resp, next) => {
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

const isAdmin = async (req, resp, next) => {
  const roles = [ROLES.ADMIN];
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

const isMinistry = async (req, resp, next) => {
  const roles = [ROLES.MINISTRY];
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

const isEmployee = async (req, resp, next) => {
  const roles = [ROLES.EMPLOYEE, ROLES.ORGANIZATION, ROLES.SUPERVISOR];
  const isChecked = await validateToken(req, resp, roles);

  const okpo = req.query.okpo || req.body.okpo;
  const userOkpo = req.user.okpo;

  if ((okpo && okpo != userOkpo && req.user.type === ROLES.EMPLOYEE) || !isChecked) {
    return returnMessage(resp, 'Permission denied');
  }
  return next();
};

const isOrganization = async (req, resp, next) => {
  const roles = [ROLES.ORGANIZATION, ROLES.SUPERVISOR];
  const isChecked = await validateToken(req, resp, roles);

  const okpo = req.query.okpo || req.body.okpo;
  const userOkpo = req.user.okpo;

  if ((okpo && okpo != userOkpo && req.user.type === ROLES.ORGANIZATION) || !isChecked) {
    return returnMessage(resp, 'Permission denied');
  }
  return next();
};

const isSupervisor = async (req, resp, next) => {
  const roles = [ROLES.SUPERVISOR];
  const isChecked = await validateToken(req, resp, roles);

  const okpo = req.query.okpo || req.body.okpo;
  const userOkpo = req.user.okpo;

  if ((okpo && okpo != userOkpo && req.user.type === ROLES.SUPERVISOR) || !isChecked) {
    return returnMessage(resp, 'Permission denied');
  }
  return next();
};

const isTypography = async (req, resp, next) => {
  const roles = [ROLES.TYPOGRAPHY];
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

const isRayono = async (req, resp, next) => {
  const roles = [ROLES.RAYONO, ROLES.MINISTRY];
  const isChecked = await validateToken(req, resp, roles);
  if (isChecked) {
    return next();
  }
  return returnMessage(resp, 'Unexpected error');
};

module.exports = {
  ROLES,
  roleGuard,
  isAuth,
  isAdmin,
  isMinistry,
  isEmployee,
  isSupervisor,
  isTypography,
  isRayono,
  validateToken,
};
