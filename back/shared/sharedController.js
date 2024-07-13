/* eslint-disable no-unused-vars */
const { send, sendError, sendSuccess } = require('../utils/send');
const validate = require('../utils/validator');
const SharedSchema = require('./sharedSchema');
const SharedService = require('./sharedService');
const LangService = require('../services/LangService');
const UserService = require('../services/UserService');
const Utils = require('../utils/utils');
const File = require('../utils/file');
const Config = require('../utils/config');
const { decrypt } = require('../utils/crypto');

class SharedController {
  async region(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const data = await SharedService.region(langId);
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async district(req, res) {
    const isValid = validate(req.query, SharedSchema.districtSchema);
    if (!isValid) {
      return send(
        res,
        { status: 'error', message: req.t('inValidFormat') },
        req.t('inValidFormat'),
        true,
        400
      );
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const { region } = req.query;
    const data = await SharedService.district(langId, parseInt(region));
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async districtByDistrict(req, res) {
    const isValid = validate(req.query, SharedSchema.districtByDistrictSchema);
    if (!isValid) {
      return send(
        res,
        { status: 'error', message: req.t('inValidFormat') },
        req.t('inValidFormat'),
        true,
        400
      );
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const { district } = req.query;
    const data = await SharedService.districtByDistrict(langId, parseInt(district));
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async direction(req, res) {
    const isValid = validate(req.query, SharedSchema.directionSchema);
    if (!isValid) {
      return send(
        res,
        { status: 'error', message: req.t('inValidFormat') },
        req.t('inValidFormat'),
        true,
        400
      );
    }
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);
    const { education } = req.query;
    const data = await SharedService.direction(langId, parseInt(education));
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async settings(req, res) {
    const data = await SharedService.settings();
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async passwordChange(req, res) {
    const isValid = validate(req.body, SharedSchema.passwordChangeSchema);

    if (!isValid) {
      return sendError(res, req.t('inValidFormat'));
    }

    const { oldPassword, newPassword } = req.body;
    const token = req.headers['authorization'];
    const user = await UserService.getTokenUser(token);
    const idUser = user.id;

    const oldPasswordDb = await SharedService.getOldPassword(idUser);
    const hashedOldPasswordBody = Utils.md5(oldPassword);
    if (oldPasswordDb != hashedOldPasswordBody) {
      return sendError(res, req.t('oldPasswordError'));
    }
    const hashedNewPasswordBody = Utils.md5(newPassword);
    const data = await SharedService.updatePassword(idUser, hashedNewPasswordBody);
    if (data) {
      return sendSuccess(res, data, req.t('success'));
    }
    return sendError(res, req.t('error'));
  }

  async yearsList(req, res) {
    const isValid = validate(req.body, SharedSchema.yearsSchema);

    if (!isValid) {
      return sendError(res, 'Invalid format');
    }

    const data = await SharedService.yearsList();
    if (data) {
      return sendSuccess(res, data, 'Success');
    }
    return sendError(res, 'Error');
  }

  async gendersList(req, res) {
    const isValid = validate(req.body, SharedSchema.genderSchema);

    if (!isValid) {
      return sendError(res, 'Invalid format');
    }

    const data = await SharedService.gendersList();
    if (data) {
      return sendSuccess(res, data, 'Success');
    }
    return sendError(res, 'Error');
  }

  async learningList(req, res) {
    const data = await SharedService.learningList();
    if (data) {
      return sendSuccess(res, data, 'Learning types list returned successfully.');
    }
    return sendError(res, 'An error occurred while get learning types.');
  }

  async qualificationsList(req, res) {
    const resolvedLanguage = req.i18n.resolvedLanguage;
    const langId = await LangService.getLangId(resolvedLanguage);

    const reqOrgType = req.query?.id_org_type;
    const userOrgType = req.user?.orgTypeId;

    if (!reqOrgType && !userOrgType) {
      return sendError(res, 'Org type not found');
    }

    const data = await SharedService.qualificationsList({
      language: langId,
      id_org_type: reqOrgType || userOrgType,
    });

    if (data) {
      return sendSuccess(res, data, 'Qualification list list returned successfully.');
    }
    return sendError(res, 'An error occurred while get qualification list.');
  }

  async disciplinesLabelList(req, res) {
    const data = await SharedService.disciplinesLabelList();
    if (data) {
      return sendSuccess(res, data, 'Success');
    }
    return sendError(res, 'Error');
  }
}

module.exports = new SharedController();
