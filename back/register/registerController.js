/* eslint-disable no-unused-vars */
const logger = require('../utils/logger');
const { send, sendError, sendSuccess } = require('../utils/send');
const validate = require('../utils/validator');
const Config = require('../utils//config');
const RegisterSchema = require('./registerSchema');
const RegisterService = require('./registerService');

const CHECK_TUNDUK = Config.CHECK_TUNDUK === 'true' ? true : false;
class RegisterController {
  async checkAccelerator(req, res) {
    const isValid = validate(req.body, RegisterSchema.checkAcceleratorSchema);
    if (!isValid) {
      return send(
        res,
        { status: 'error', message: req.t('inValidFormat') },
        req.t('inValidFormat'),
        true,
        400
      );
    }
    const { pin, email } = req.body;
    const data = await RegisterService.checkAccelerator(pin, email);
    if (data?.id === 1) {
      return sendSuccess(res, data, req.t('error'), true, 200);
    }
    return sendSuccess(res, true, req.t('success'));
  }

  async accelerator(req, res) {
    try {
      const isValid = validate(req.body, RegisterSchema.acceleratorSchema);
      if (!isValid) {
        return sendError(res, req.t('inValidFormat'));
      }
      // if (Config.REGISTER_ALLOW === "false") {
      //   return sendError(res, "Закончился срок регистрации");
      //   // return sendError(res, req.t("inValidFormat"));
      // }
      const { body } = req;
      const {
        pin: pinString,
        surname,
        name,
        patronymic,
        birthDate,
        idPassportSeries,
        passportNumber,
        telephone,
        email,
        password,
        idDistrict,
        address,
        idOperatingMode,
        idWorkingDay,
        kyrgyz,
        russian,
        uzbek,
        anotherLanguage,
        organizationName,
        idOwnership,
      } = body;

      const pin = Number(pinString);

      const isExist = await RegisterService.isPinEmailExist(pin, email);
      if (isExist.pin && !isExist.email) {
        return sendError(res, req.t('registry.pinExist'));
      } else if (!isExist.pin && isExist.email) {
        return sendError(res, req.t('registry.emailExist'));
      }

      let name2DB = name,
        surname2DB = surname,
        middlename2DB = patronymic || '',
        dateBirth2DB = birthDate,
        tel2DB = `0${String(telephone).slice(3, 12)}`;

      if (pin && CHECK_TUNDUK) {
        const requestXML = await RegisterService.dataByPin(pin);
        const { data: dataTunduk, error: errorTunduk } = await RegisterService.fetchData(requestXML);
        if (errorTunduk) {
          return sendError(res, req.t('registry.pinOrPassportInCorrect'));
        }

        if (dataTunduk.name.toLowerCase() != name.toLowerCase().trim()) {
          return sendError(res, req.t('registry.nameInCorrect'));
        }

        if (dataTunduk.surname.toLowerCase() != surname.toLowerCase().trim()) {
          return sendError(res, req.t('registry.surnameInCorrect'));
        }

        if (dataTunduk.dateOfBirth != birthDate) {
          return sendError(res, req.t('registry.dateBirthInCorrect'));
        }

        name2DB = dataTunduk.name;
        surname2DB = dataTunduk.surname;
        middlename2DB = dataTunduk.patronymic;
        dateBirth2DB = dataTunduk.dateOfBirth;

        logger.info(`XML ${dataTunduk.pin}`);
      }

      const hashPassword = RegisterService.md5(password);

      const insertAccelerator = RegisterService.insertAccelerator(
        pin,
        surname2DB,
        name2DB,
        middlename2DB,
        dateBirth2DB,
        idPassportSeries,
        passportNumber,
        tel2DB,
        email,
        hashPassword,
        idDistrict,
        address,
        idOperatingMode,
        idWorkingDay,
        kyrgyz,
        russian,
        uzbek,
        anotherLanguage,
        organizationName,
        idOwnership
      );

      if (insertAccelerator) {
        return sendSuccess(res, true, req.t('registry.success'));
      }

      if (insertAccelerator == false) {
        //db save error
        return sendError(res, req.t('registry.dbInsertChallengerError'));
      }

      return sendError(res, req.t('registry.unknownError'));
    } catch (error) {
      logger.error(`Error registry user ${JSON.stringify(error)}`);
      return sendError(res, req.t('registry.tryError'));
    }
  }
}

module.exports = new RegisterController();
