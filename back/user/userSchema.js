const userSchema = {
  type: 'object',
  properties: {
    login: { type: ['string', 'number'], required: true },
    password: { type: 'string', required: true },
  },
};

const externalUserSchema = {
  type: 'object',
  properties: {
    token: { type: 'string', required: true },
  },
};

module.exports = {
  userSchema,
  externalUserSchema,
};
