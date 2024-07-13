```js
const TundukService = require('../tunduk');
const Config = require('../utils/config');

const CHECK_TUNDUK = Config.CHECK_TUNDUK === 'true' ? true : false;

// controller method

if (pin && CHECK_TUNDUK) {
  const { data: dataTunduk, error: errorTunduk } = await TundukService.PinService.getPinData(pin);
  if (errorTunduk) {
    return sendError(res, req.t('register.pinOrPassportInCorrect'));
  }

  if (dataTunduk.name.toLowerCase() != name.toLowerCase().trim()) {
    return sendError(res, req.t('register.nameInCorrect'));
  }

  if (dataTunduk.surname.toLowerCase() != surname.toLowerCase().trim()) {
    return sendError(res, req.t('register.surnameInCorrect'));
  }

  // pin
  // name
  // surname
  // patronymic
  // gender
  // nationality
  // nationalityId
  // citizenship
  // citizenshipId
  // dateOfBirth
}
```
