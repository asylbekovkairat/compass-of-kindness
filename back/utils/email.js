const Config = require('./config');
const logger = require('./logger');

const EMAIL_API = Config.EMAIL_API;
const EMAIL_TYPE = Config.EMAIL_TYPE;

async function sendMessage(data) {
  const { email = '', message = '', content = '', redirect = false } = data;
  try {
    const response = await fetch(`${EMAIL_API}/mail/send`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        message,
        type: EMAIL_TYPE,
        email: email.trim(),
        redirect: redirect,
        content: content,
      }),
    });
    logger.info(`Response send message:`);
    console.log(response);
    return response;
  } catch (err) {
    logger.error(`Error send message: ${err.message}`);
    console.log(err);
    return null;
  }
}
module.exports = { sendMessage };
