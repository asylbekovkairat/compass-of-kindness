const sharp = require('sharp');
const logger = require('./logger');

const minimized = async (input, output, format = 'jpeg') => {
  try {
    const destination = `${output}${format}`;
    logger.info(`MINIMIZED IMAGE destination: ${destination}`);

    await sharp(input)
      .resize(100, 100, {
        fit: sharp.fit.outside,
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toFile(destination);
    return true;
    // Write code to store image to the database
  } catch (e) {
    logger.info('MINIMIZED IMAGE ERROR');
    logger.error(JSON.stringify(e));
    return false;

    // handles error if any
  }
};
const normal = async (input, output, format = 'jpeg') => {
  try {
    const destination = `${output}${format}`;
    logger.info(`Normal IMAGE destination: ${destination}`);

    await sharp(input)
      .resize(500, 500, {
        fit: sharp.fit.outside,
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toFile(destination);
    return true;

    // Write code to store image to the database
  } catch (e) {
    logger.info('Normal IMAGE ERROR');
    logger.error(e);
    return false;
    // handles error if any
  }
};
const custom = async (input, output, width, height, format = 'jpeg') => {
  try {
    const destination = `${output}${format}`;
    logger.info(`custom IMAGE destination: ${destination}`);

    await sharp(input)
      .resize(width || 150, height || 150, {
        fit: sharp.fit.outside,
        withoutEnlargement: true,
      })
      .toFormat(format)
      .toFile(destination);
    return true;

    // Write code to store image to the database
  } catch (e) {
    logger.error('custom IMAGE ERROR');
    logger.error(e);
    return false;
    // handles error if any
  }
};
const withoutConfig = async (input, output, format = 'jpeg') => {
  try {
    const destination = `${output}${format}`;
    logger.info(`withoutConfig IMAGE destination: ${destination}`);

    await sharp(input).toFormat(format).toFile(destination);

    return true;
    // Write code to store image to the database
  } catch (e) {
    logger.error('withoutConfig IMAGE ERROR');
    logger.error(e);
    return false;
    // handles error if any
  }
};

module.exports = { minimized, normal, custom, withoutConfig };
