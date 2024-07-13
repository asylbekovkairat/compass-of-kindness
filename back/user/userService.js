const db = require('../utils/db');
const { md5 } = require('../utils/utils');
const Config = require('../utils//config');

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
    console.error('Error in getUser:', err.message);
    return false;
  }
}

async function login(lang, login, password) {
  try {
    const cryptoPass = md5(password);
    const { rows } = await db.query('select * from fn_auth($1, $2, $3);', [lang, login, cryptoPass]);
    if (rows.length > 0) {
      const { id, id_role, id_organization, pin, role, surname, name, patronymic, okpo, id_org_type } =
        rows[0];
      return {
        idUser: id,
        idRole: id_role,
        idOrganization: id_organization,
        pin,
        role,
        surname,
        name,
        patronymic,
        okpo,
        orgTypeId: id_org_type,
      };
    }
    return false;
  } catch (err) {
    console.error('Error in login:', err.message);
    return false;
  }
}

async function getUserByPin(pin) {
  try {
    const { rows } = await db.query(
      'select u.*, role.role from users u where pin=$1 inner join role using ($1)',
      [pin]
    );
    if (rows.length > 0) {
      const { id_users, id_role, id_organization, role, surname, name, patronymic, okpo, pin } = rows[0];
      return {
        idUser: id_users,
        idRole: id_role,
        role,
        idOrganization: id_organization,
        pin,
        surname,
        name,
        patronymic,
        okpo,
        pin,
      };
    }
    return false;
  } catch (err) {
    console.error('Error in getUserByPin:', err.message);
    return false;
  }
}

async function getUserById(id) {
  try {
    const { rows } = await db.query('SELECT x.* FROM public.users x where x.id_users=$1', [id]);
    return rows[0];
  } catch (err) {
    console.error('Error in getUserByPin:', err.message);
    return false;
  }
}

async function getOrganizationByOKPO(okpo) {
  try {
    const { rows } = await db.query('select id_organization from organization where okpo=$1', [okpo]);
    if (rows.length > 0) {
      return rows[0].id_organization;
    }
    return false;
  } catch (err) {
    console.error('Error in getOrganizationByOKPO:', err.message);
    return false;
  }
}

async function getOrganizationByOrganizationId(id) {
  try {
    const { rows } = await db.query('select * from organization where id_organization=$1', [id]);
    if (rows.length > 0) {
      return rows[0];
    }
    return false;
  } catch (err) {
    console.error('Error in getOrganization by organization id:', err.message);
    return false;
  }
}

async function getRoleByRoleId(id_role) {
  try {
    const { rows } = await db.query('select * from role r where id_role=$1', [id_role]);
    if (rows.length > 0) {
      return rows[0];
    }
    return false;
  } catch (err) {
    console.error('Error in getRoleByRoleId:', err.message);
    return false;
  }
}

async function insertUser(decodedData) {
  try {
    if (!decodedData.data.pin) return false;

    const { pin, first_name, last_name, middle_name, okpo, id_organization, role } = decodedData;
    const { rows, rowCount } = await db.query(
      `INSERT INTO users (id_role, surname, name, patronymic, pin, okpo, id_organization) 
     VALUES (3, '${last_name}', '${first_name}', '${middle_name}', '${pin}','${okpo}', ${id_organization}) RETURNING * `,
      []
    );

    if (rowCount > 0) {
      const {
        id_users: idUser,
        id_role: idRole,
        id_organization: idOrganization,
        surname,
        name,
        patronymic,
        email,
        okpo,
      } = rows[0];
      return {
        idUser,
        idRole,
        idOrganization,
        pin,
        role,
        surname,
        name,
        patronymic,
        email,
        okpo,
      };
    }
  } catch (err) {
    console.error('Error in insertUser:', err.message);
    return false;
  }
}

module.exports = {
  getUser,
  login,
  getUserByPin,
  getRoleByRoleId,
  getOrganizationByOrganizationId,
  insertUser,
  getUserById,
  getOrganizationByOKPO,
};
