const checkAcceleratorSchema = {
  type: 'object',
  properties: {
    pin: { type: 'number', required: true },
    email: { type: 'string', minLength: 1, required: true },
  },
};

const acceleratorSchema = {
  type: 'object',
  properties: {
    pin: { type: 'number', required: true },
    surname: { type: 'string', minLength: 1, required: true },
    name: { type: 'string', minLength: 1, required: true },
    patronymic: { type: 'string' },
    birthDate: { type: 'string', minLength: 10, maxLength: 10, required: true },
    idPassportSeries: { type: 'number', required: true },
    passportNumber: { type: 'string', required: true },
    telephone: { type: 'string', minLength: 1, required: true },
    email: { type: 'string', minLength: 1, required: true },
    password: { type: 'string', minLength: 1, required: true },

    idDistrict: { type: 'number', required: true },
    address: { type: 'string', minLength: 1, required: true },
    idOperatingMode: { type: 'number', required: true },
    idWorkingDay: { type: 'number', required: true },
    kyrgyz: { type: 'boolean', minLength: 1, required: true },
    russian: { type: 'boolean', minLength: 1, required: true },
    uzbek: { type: 'boolean', minLength: 1, required: true },
    anotherLanguage: { type: 'boolean', minLength: 1, required: true },
    organizationName: { type: 'string', minLength: 1, required: true },
    idOwnership: { type: 'number', required: true },
  },
};

module.exports = {
  checkAcceleratorSchema,
  acceleratorSchema,
};
