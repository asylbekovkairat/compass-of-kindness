const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { corsOptionsDelegate } = require('./utils/cors');
const { helmetConfig } = require('./utils/helmet');
const swaggerSpec = require('./utils/swagger');
const JwtCheck = require('./utils/jwtCheck');
const translator = require('./utils/i18n');
const logger = require('./utils/logger');
const Config = require('./utils/config');
const app = express();

// Compression settings
app.use(compression());

// CORS settings
app.use(cors(corsOptionsDelegate));

// HELMET settings
// app.use(helmet(helmetConfig()));

// Cookie parser
app.use(cookieParser());

// JSON parsing middleware
app.use(express.json());

// File upload middleware
app.use(fileUpload());

// Translator middleware
app.use(translator);

// Static file serving
app.use('/project-uniq-name', express.static('public'));

// Fake auth mode check
if (Config.FAKE_AUTH_MODE === 'true') {
  logger.info('FAKE_AUTH_MODE = true');
}

// API routes
app.use('/project-uniq-name/api/user', require('./user'));
app.use('/project-uniq-name/api/register', require('./register'));
app.use('/project-uniq-name/api/shared', require('./shared'));
// app.use('/project-uniq-name/api', JwtCheck.isAuth, require('./site'));

// API Docs conditionally enabled in dev mode
if (Config.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
}

// Redirect root to a specific path
app.use('/*', (req, res, _next) => {
  if (req.originalUrl === '/') return res.redirect('/project-uniq-name');
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error(`errorHandler => ${JSON.stringify(error)}`);
  return res.status(400).json({ error: true, data: false, message: error.message });
});

// Server initialization
const port = Config.PORT || 4000;
app.listen(port, () => {
  logger.info(`Application listening on port ${port}`);
});
