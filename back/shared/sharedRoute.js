const express = require('express');
const router = express.Router();
const SharedController = require('./sharedController');
const JwtCheck = require('../utils/jwtCheck');

/**
 * @swagger
 *components:
 *  schemas:
 *    District:
 *      type: string
 *
 *    DistrictByDistrict:
 *      type: string
 *
 *    School:
 *      type: object
 *      properties:
 *        region:
 *          type: string
 *          required: true
 *
 *    OrganizationList:
 *      type: object
 *      properties:
 *        districtId:
 *          type: number
 *          required: true
 *
 *    OrganizationInfo:
 *      type: object
 *      properties:
 *        organizationId:
 *          type: number
 *          required: true
 *
 *    PasswordChange:
 *      type: object
 *      properties:
 *        oldPassword:
 *          type: string
 *          required: true
 *        newPassword:
 *          type: string
 *          required: true
 */

/**
 * @swagger
 * /shared/region:
 *   get:
 *     summary: Get region information
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/region', SharedController.region);
/**
 * @swagger
 * /shared/district:
 *   get:
 *     summary: Get districts based on region
 *     tags:
 *       - Shared
 *     parameters:
 *       - in: query
 *         name: region
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/District'
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Bad Request
 */
router.get('/district', SharedController.district);

/**
 * @swagger
 * /shared/districtByDistrict:
 *   get:
 *     summary: Get districts based on district
 *     tags:
 *       - Shared
 *     parameters:
 *       - in: query
 *         name: district
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/DistrictByDistrict'
 *     responses:
 *       '200':
 *         description: Successful response
 *       '400':
 *         description: Bad Request
 */
router.get('/districtByDistrict', SharedController.districtByDistrict);

/**
 * @swagger
 * /shared/direction:
 *   get:
 *     summary: Get direction information
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/direction', SharedController.direction);

/**
 * @swagger
 * /shared/settings:
 *   get:
 *     summary: Get settings information
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/settings', JwtCheck.isAuth, SharedController.settings);

/**
 * @swagger
 * /shared/yearsList:
 *   get:
 *     summary: Get years list
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/years-list', SharedController.yearsList);

/**
 * @swagger
 * /shared/gendersList:
 *   get:
 *     summary: Get genders list
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/genders-list', SharedController.gendersList);
/**
 * @swagger
 * /shared/learningList:
 *   get:
 *     summary: Get learning list
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/learning-list', SharedController.learningList);
/**
 * @swagger
 * /shared/qualificationsList:
 *   get:
 *     summary: Get qualifications list
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/qualifications-list', SharedController.qualificationsList);
/**
 * @swagger
 * /shared/disciplinesList:
 *   get:
 *     summary: Get disciplines label list
 *     tags:
 *       - Shared
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/disciplines-list', SharedController.disciplinesLabelList);

// SettingsController

/**
 * @swagger
 * /shared/password/change:
 *   post:
 *     summary: Change password
 *     tags:
 *       - Shared
 *     security:
 *       - acceleratorToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordChange'
 *     responses:
 *       '200':
 *         description: Successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad Request
 */
router.post('/password/change', JwtCheck.isAuth, SharedController.passwordChange);

module.exports = router;
