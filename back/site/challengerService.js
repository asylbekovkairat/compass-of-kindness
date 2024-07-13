const db = require("../utils/db");
const file = require("../utils/file");
const Config = require("../utils/config");

const DOC_PATH = Config.DOC_PATH;

async function detail(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challenger detail", err.message);
    return false;
  }
}
async function info(lang, idChal) {
  try {
    const { rowCount, rows } = await db.query(
      "select * from public.fn_challenger_info($1, $2);",
      [lang, idChal]
    );
    if (rowCount) return rows[0];
    return false;
  } catch (err) {
    console.log("error challenger info", err.message);
    return false;
  }
}
async function doc(lang, idChal) {
  try {
    const { rows } = await db.query(
      "select * from public.fn_challenger_document($1, $2);",
      [lang, idChal]
    );
    return rows;
  } catch (err) {
    console.log("error challenger doc", err.message);
    return false;
  }
}
async function langSave(idChal, kg, ru, en, other) {
  try {
    const { rows } = await db.query(
      `UPDATE public.challenger_info
      SET kyrgyz=$2, russian=$3, english=$4, other=$5
      WHERE id_challenger_info=$1;`,
      [idChal, kg, ru, en, other]
    );
    return rows;
  } catch (err) {
    console.log("error challenger doc", err.message);
    return false;
  }
}
async function docSave(idChal, idDoc, docUrl) {
  try {
    const resDoc = await db.query("call sp_challenger_document($1, $2, $3);", [
      idChal,
      idDoc,
      docUrl,
    ]);
    return resDoc.error ? false : true;
  } catch (err) {
    console.log("error challenger save", err.message);
    return false;
  }
}
async function university(idChal) {
  try {
    const { rows } = await db.query("SELECT * FROM fn_challenger_text($1);", [
      idChal,
    ]);
    return rows;
  } catch (err) {
    console.log("error challenger university", err.message);
    return false;
  }
}
async function universitySave(
  idChal,
  telephone,
  email,
  district,
  address,
  education,
  kyrgyz,
  russian,
  english,
  other,
  university,
  speciality,
  essay,
  additional
) {
  try {
    //  id_challenger, integer,
    //  telephone, character varying,
    //  email, character varying,
    //  id_district_city, integer,
    //  address, character varying,
    //  id_education_level, integer,
    //  kyrgyz, numeric,
    //  russian, numeric,
    //  english, numeric,
    //  other, numeric,
    //  university, text,
    //  speciality, text,
    //  essay, text,
    //  additional, text

    const resUniver = await db.query(
      "call sp_challenger_save($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);",
      [
        idChal,
        telephone,
        email,
        district,
        address,
        education,
        kyrgyz,
        russian,
        english,
        other,
        university,
        speciality,
        essay,
        additional,
      ]
    );
    return resUniver.error ? false : true;
  } catch (err) {
    console.log("error challenger universitySave", err.message);
    return false;
  }
}
async function updatePassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'UPDATE public.challenger SET "password"=$2 WHERE id_challenger=$1;',
      [idChal, password]
    );
    return rows;
  } catch (err) {
    console.log("error challenger updatePassword", err.message);
    return false;
  }
}
async function checkPassword(idChal, password) {
  try {
    const { rows } = await db.query(
      'SELECT EXISTS(select 1 from  public.challenger WHERE id_challenger=$1 and "password"=$2);',
      [idChal, password]
    );
    if (rows.length > 0) {
      const { exists } = rows[0];
      return exists;
    }
    return false;
  } catch (err) {
    console.log("error challenger checkPassword", err.message);
    return false;
  }
}

async function photo(idChal, photoPath) {
  try {
    // await db.query('call "sp_employee_photo"($1, $2)', [idChal, photoPath]);
    // const { rows, rowCount } = await db.query(
    //   `
    // WITH upsert AS(
    //     UPDATE  public.employee_photo SET employee_photo = $2
    //     WHERE id_employee = $1
    //     RETURNING *
    // )
    //     INSERT INTO public.employee_photo (id_employee, employee_photo)
    //     select $1, $2
    //     WHERE NOT EXISTS(SELECT * FROM upsert)
    //     RETURNING * `,
    //   [idChal, photoPath]
    // );
    // return rows || rowCount;
    return true;
  } catch (err) {
    console.log("error challenger photo", err.message);
    return false;
  }
}

async function iudDocFile(idDoc, idChal, iud, name, content) {
  try {
    const path = `${DOC_PATH}${idDoc}_${idChal}_${name}`;
    let data;
    if (iud === 0) {
      data = await file.write(path, content);
    }
    if (iud === 1) {
      data = await file.write(path, content);
    }
    if (iud === 2) {
      data = await file.deleteFile(path);
    }
    return data;
  } catch (err) {
    console.log("error iudDocFile", err.message);
    return false;
  }
}
module.exports = {
  detail,
  info,
  doc,
  langSave,
  docSave,
  university,
  universitySave,
  updatePassword,
  checkPassword,
  photo,
  iudDocFile,
};
