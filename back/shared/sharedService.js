const { MANUAL_VIDEO, MANUAL_PDF, MANUAL_VIDEO_PATH, MANUAL_PDF_PATH } = require('../utils/config');
const db = require('../utils/db');
const logger = require('../utils/logger');

async function region(lang) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_region"($1)', [lang]);
    return rows;
  } catch (err) {
    logger.error(`Error region: ${err.message}`);
    return false;
  }
}

async function district(lang, idRegion) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_district"($1, $2)', [lang, idRegion]);
    return rows;
  } catch (err) {
    logger.error(`Error region: ${err.message}`);
    return false;
  }
}

async function districtByDistrict(lang, idDistrict) {
  try {
    const { rows } = await db.query(
      `SELECT
		    district.id_district, lan_district($1, district.id_district) as district
	    FROM district
      WHERE district.id_region = (select id_region from district d where id_district=$2)
	    ORDER BY district;`,
      [lang, idDistrict]
    );
    return rows;
  } catch (err) {
    logger.error(`Error districtByDistrict: ${err.message}`);
    return false;
  }
}

async function direction(lang, idEducation) {
  try {
    const { rows } = await db.query('SELECT * FROM "fn_education_level_direction"($1, $2)', [
      lang,
      idEducation,
    ]);
    return rows;
  } catch (err) {
    logger.error(`Error direction: ${err.message}`);
    return false;
  }
}

async function settings() {
  try {
    const { rows } = await db.query(
      `SELECT s.settings_name, s.settings_value FROM public.settings s
    WHERE s.public = true`,
      []
    );
    return rows;
  } catch (err) {
    logger.error(`Error settings: ${err.message}`);
    return false;
  }
}

async function updatePassword(idUser, newPassword) {
  try {
    const { rowCount } = await db.query(
      `UPDATE public.users
    SET  password=$2 WHERE id_users=$1;`,
      [idUser, newPassword]
    );
    return rowCount;
  } catch (err) {
    logger.error(`Error settings updatePassword: ${err.message}`);
    return false;
  }
}

async function getOldPassword(idUser) {
  try {
    const { rowCount, rows } = await db.query(
      `SELECT "password" FROM public.users
    WHERE id_users = ($1);`,
      [idUser]
    );
    if (rowCount) return rows[0].password;
    return false;
  } catch (err) {
    logger.error(`Error settings getOldPassword: ${err.message}`);
    return false;
  }
}

async function yearsList() {
  try {
    const { rows } = await db.query('SELECT * FROM fn_years();');
    return rows;
  } catch (err) {
    logger.error(`Error fetching years:: ${err.message}`);
    return false;
  }
}

async function classesList() {
  try {
    const { rows } = await db.query('SELECT * FROM fn_class();');
    return rows;
  } catch (err) {
    logger.error(`Error fetching classes:: ${err.message}`);
    return false;
  }
}

async function gendersList() {
  try {
    const { rows } = await db.query('SELECT * FROM fn_gender()');
    return rows;
  } catch (err) {
    logger.error(`Error fetching genders:: ${err.message}`);
    return false;
  }
}

async function learningList() {
  try {
    const { rows } = await db.query('SELECT * FROM fn_learning()', []);
    return rows;
  } catch (err) {
    logger.error(`Error fetching learning list: ${err.message}`);
    return false;
  }
}

async function qualificationsList({ language, id_org_type }) {
  try {
    const { rows } = await db.query('SELECT * FROM fn_qualification($1, $2)', [
      language,
      parseInt(id_org_type),
    ]);
    return rows;
  } catch (err) {
    logger.error(`Error fetching qualifications list:: ${err.message}`);
    return false;
  }
}

async function disciplinesLabelList() {
  try {
    const { rows } = await db.query('SELECT * FROM fn_discipline_dop_name()');
    return rows;
  } catch (err) {
    logger.error(`Error fetching disciplines labels:: ${err.message}`);
    return false;
  }
}

module.exports = {
  region,
  district,
  direction,
  updatePassword,
  getOldPassword,
  districtByDistrict,
  settings,
  yearsList,
  classesList,
  gendersList,
  learningList,
  qualificationsList,
  disciplinesLabelList,
};
