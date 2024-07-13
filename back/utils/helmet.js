const helmet = require('helmet');
const { ALLOW_HOST_LIST } = require('./config');

const helmetConfig = () => {
  return {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'unsafe-inline', 'https://cdnjs.cloudflare.com', ...ALLOW_HOST_LIST],
        scriptSrc: ["'self'", 'unsafe-inline', 'https://cdnjs.cloudflare.com', ...ALLOW_HOST_LIST],
        imgSrc: ["'self'", 'unsafe-inline', 'data:image/*', ...ALLOW_HOST_LIST],
        connectSrc: ["'self'", 'unsafe-inline', ...ALLOW_HOST_LIST],
        fontSrc: ["'self'", 'unsafe-inline', 'https://fonts.gstatic.com', ...ALLOW_HOST_LIST],
      },
    },
    crossOriginEmbedderPolicy: {
      policy: 'require-corp',
    },
    crossOriginResourceSharing: {
      origin: ALLOW_HOST_LIST,
      credentials: true,
    },
    hsts: {
      maxAge: 31536000,
      includeSubdomains: true,
      preload: true,
    },
    referrerPolicy: {
      policy: 'same-origin',
    },
    frameguard: {
      action: 'deny',
    },
    xssFilter: {
      enabled: true,
    },
  };
};

module.exports = { helmetConfig };
