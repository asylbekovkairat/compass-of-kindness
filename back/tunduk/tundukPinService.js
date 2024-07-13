const Utils = require('./utils');
const Config = require('../utils/config');
const PIN_CONSUMER = Config.PIN_CONSUMER;

// umut consumer
async function generatePinXml(pin) {
  const xmlData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"  
  xmlns:xro="http://x-road.eu/xsd/xroad.xsd"  
  xmlns:iden="http://x-road.eu/xsd/identifiers"  
  xmlns:zags="http://tunduk-seccurity-infocom.x-road.fi/producer">  
  <soapenv:Header>  
  <xro:userId>1</xro:userId>  
  <xro:service iden:objectType="SERVICE">  
  <iden:xRoadInstance>central-server</iden:xRoadInstance>  
  <iden:memberClass>GOV</iden:memberClass>  
  <iden:memberCode>70000005</iden:memberCode>  
  <!--Optional:-->  
  <iden:subsystemCode>zags-service</iden:subsystemCode>  
  <iden:serviceCode>zagsDataByPin</iden:serviceCode>  
  <iden:serviceVersion>v1</iden:serviceVersion>  
  </xro:service>  
  <xro:protocolVersion>4.0</xro:protocolVersion>  
  <xro:issue>123</xro:issue>  
  <xro:id>1</xro:id>  
  <xro:client iden:objectType="SUBSYSTEM">  
  <iden:xRoadInstance>central-server</iden:xRoadInstance>  
  <iden:memberClass>GOV</iden:memberClass>  
  <iden:memberCode>70000016</iden:memberCode>  
  <!--Optional:-->  
  <iden:subsystemCode>${PIN_CONSUMER}</iden:subsystemCode>  
  </xro:client>  
  </soapenv:Header>  
  <soapenv:Body>  
  <zags:zagsDataByPin>  
  <request>  
  <pin>${pin}</pin>  
  </request>  
  </zags:zagsDataByPin>  
  </soapenv:Body>  
  </soapenv:Envelope>`;
  return xmlData;
}
async function fetchPinData(pinXml) {
  try {
    const resp = await Utils.fetchTundukData(pinXml);
    if (resp.error) {
      return { data: false, error: resp.error };
    }

    const respObject = resp.data;

    const respData =
      respObject['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ts1:zagsDataByPinResponse'][0]['ts1:response'][0];
    if (respData['faultcode']) {
      return { data: false, error: '404' };
    }
    if (respData['ts1:pin']) {
      const data = {
        pin: respData['ts1:pin'][0],
        name: respData['ts1:name'][0],
        surname: respData['ts1:surname'][0],
        patronymic: respData['ts1:patronymic'][0],
        gender: respData['ts1:gender'][0],
        // maritalStatus: respData['ts1:maritalStatus'][0],
        // maritalStatusId: respData['ts1:maritalStatusId'][0],
        nationality: respData['ts1:nationality'][0],
        nationalityId: respData['ts1:nationalityId'][0],
        citizenship: respData['ts1:citizenship'][0],
        citizenshipId: respData['ts1:citizenshipId'][0],
        // pinBlocked: respData['ts1:pinBlocked'][0],
        // pinGenerationDate: respData['ts1:pinGenerationDate'][0],
        dateOfBirth: respData['ts1:dateOfBirth'][0].slice(0, 10),
        // deathDate: respData['ts1:deathDate'][0]
      };
      return { data, error: false };
    }
    return { data: false, error: '400' };
  } catch (error) {
    console.log('zags fetchData error ', error.message);
    return { data: false, error: error.message };
  }
}
async function getPinData(pin) {
  try {
    const pinXml = await generatePinXml(pin);
    const response = await fetchPinData(pinXml);
    return await response;
  } catch (error) {
    console.log('tunduk getPinData error ', error.message);
    return { data: false, error: error.message };
  }
}
// pin
// name
// surname
// patronymic
// gender
// nationality
// nationalityId
// citizenship
// citizenshipId
// dateOfBirth

module.exports = {
  getPinData,
};
