const { createLogger, format, transports, addColors } = require('winston');

const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
    trace: 'blue',
  },
};

addColors(logLevels.colors);

const logger = createLogger({
  levels: logLevels.levels,
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

module.exports = logger;
