const axios = require('axios');
const xml2js = require('xml2js');
const Config = require('../utils/config');

const SECURITY_SERVER_URL = Config.SECURITY_SERVER_URL;

async function xml2obj(xml) {
  const parser = new xml2js.Parser();
  const result = await new Promise((resolve, reject) =>
    parser.parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  );
  return result;
}
async function fetchTundukData(xmlData, timeout = 30000, headers = {}) {
  try {
    const response = await axios.post(SECURITY_SERVER_URL, xmlData, {
      timeout,
      headers: {
        'Content-Type': 'text/xml',
        ...headers,
      },
      // httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    const respObject = await xml2obj(response.data);
    return { data: respObject, error: false };
  } catch (error) {
    console.log('fetchTundukData error ', error.message);
    return { data: false, error: error.message };
  }
}
module.exports = {
  xml2obj,
  fetchTundukData,
};
