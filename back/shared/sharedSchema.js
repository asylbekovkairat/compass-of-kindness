const districtSchema = {
  type: 'object',
  properties: {
    region: { type: 'string', required: true },
  },
};
const districtByDistrictSchema = {
  type: 'object',
  properties: {
    district: { type: 'string', required: true },
  },
};
const directionSchema = {
  type: 'object',
  properties: {
    education: { type: 'string', required: true },
  },
};
const passwordChangeSchema = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 28,
    },
    newPassword: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 28,
    },
  },
};
const yearsSchema = {
  type: 'object',
  properties: {},
};
const genderSchema = {
  type: 'object',
  properties: {},
};
const qualificationsSchema = {
  type: 'object',
  properties: {
    id_org_type: { type: 'string', required: true },
  },
};

module.exports = {
  districtSchema,
  directionSchema,
  passwordChangeSchema,
  districtByDistrictSchema,
  yearsSchema,
  genderSchema,
  qualificationsSchema,
};
