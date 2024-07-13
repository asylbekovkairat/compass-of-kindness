const { ALLOW_HOST_LIST } = require('./config');

const corsOptionsDelegate = (req, callback) => {
  const corsOptions = getCorsOptions(req.headers.origin);
  callback(null, corsOptions);
};

function getCorsOptions(origin) {
  if (!origin) {
    console.warn('Origin header not found in request. Access may be restricted.');
    return { origin: ALLOW_HOST_LIST.length > 0 ? ALLOW_HOST_LIST[0] : '*' };
  }

  if (ALLOW_HOST_LIST.includes(origin)) {
    return { origin: true, credentials: true };
  }

  return { origin: false };
}

module.exports = { corsOptionsDelegate };
