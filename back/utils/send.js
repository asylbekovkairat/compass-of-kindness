const send = (res, data = false, message = 'OK', error = false, statusCode = 200) => {
  return res.status(statusCode).json({ data, message, error });
};

const sendSuccess = (res, data = false, message = 'OK') => {
  return send(res, data, message, false, 200);
};

const sendError = (res, message = 'Error', statusCode = 400) => {
  return send(res, false, message, true, statusCode);
};

module.exports = { send, sendSuccess, sendError };
