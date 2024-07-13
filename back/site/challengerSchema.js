const docSaveSchema = {
  type: "object",
  properties: {
    kg: { type: "number", required: true },
    ru: { type: "number", required: true },
    en: { type: "number", required: true },
    other: { type: "number", required: true },
  },
};
const langSaveSchema = {
  type: "object",
  properties: {
    id: { type: "string", required: true },
    value: { type: "string", required: true },
  },
};

const universitySaveSchema = {
  type: "object",
  properties: {
    telephone: { type: "string" },
    email: { type: "string" },
    district: { type: "number", required: true },
    address: { type: "string" },
    education: { type: "number", required: true },
    kyrgyz: { type: "number", required: true },
    russian: { type: "number", required: true },
    english: { type: "number", required: true },
    other: { type: "number", required: true },
    university: { type: "string" },
    speciality: { type: "string" },
    essay: { type: "string" },
    additional: { type: "string" },
  },
};

const passwordSchema = {
  type: "object",
  properties: {
    id: { type: "number", required: true },
    password: { type: "string", required: true },
  },
};
const photoSchema = {
  type: "object",
  properties: {
    id: { type: "string", required: true },
  },
};

module.exports = {
  docSaveSchema,
  langSaveSchema,
  universitySaveSchema,

  passwordSchema,
  photoSchema,
};
