const crypto = require('crypto');

const CYRILIC = {
  Ң: 'N',
  Ө: 'O',
  Ү: 'U',
  Ё: 'YO',
  Й: 'I',
  Ц: 'TS',
  У: 'U',
  К: 'K',
  Е: 'E',
  Н: 'N',
  Г: 'G',
  Ш: 'SH',
  Щ: 'SCH',
  З: 'Z',
  Х: 'H',
  Ъ: "'",
  ё: 'yo',
  й: 'i',
  ц: 'ts',
  у: 'u',
  к: 'k',
  е: 'e',
  н: 'n',
  г: 'g',
  ш: 'sh',
  щ: 'sch',
  з: 'z',
  х: 'h',
  ъ: "'",
  Ф: 'F',
  Ы: 'I',
  В: 'V',
  А: 'A',
  П: 'P',
  Р: 'R',
  О: 'O',
  Л: 'L',
  Д: 'D',
  Ж: 'ZH',
  Э: 'E',
  ф: 'f',
  ы: 'i',
  в: 'v',
  а: 'a',
  п: 'p',
  р: 'r',
  о: 'o',
  л: 'l',
  д: 'd',
  ж: 'zh',
  э: 'e',
  Я: 'Ya',
  Ч: 'CH',
  С: 'S',
  М: 'M',
  И: 'I',
  Т: 'T',
  Ь: "'",
  Б: 'B',
  Ю: 'YU',
  я: 'ya',
  ч: 'ch',
  с: 's',
  м: 'm',
  и: 'i',
  т: 't',
  ь: "'",
  б: 'b',
  ю: 'yu',
  ө: 'o',
  ң: 'n',
  ү: 'u',
};

function generatePassword() {
  var length = 6,
    charset = 'abcdefghijkmnpqrstuvxyzABCDEFGHJKLMNPQRSTUVXYZ23456789',
    value = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    value += charset.charAt(Math.floor(Math.random() * n));
  }
  return { crypto: md5(value), password: value };
}

function md5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

function salt() {
  // return 'wr29of3QvaBq96hN' //'6b3f0e30cf8fb195d308123acae588c1';
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function onlyLetterNumberDot(name) {
  return String(name || '').replace(/[^a-zA-ZА-Яа-яёЁ.0-9]/gm, '') || new Date().getTime();
}
function onlyLetterNumberDotUnderscore(name) {
  return String(name || '').replace(/[^a-zA-ZА-Яа-яёЁ._0-9]/gm, '') || new Date().getTime();
}

function transliterate(word) {
  return word
    .split('')
    .map(function (char) {
      return CYRILIC[char] || char;
    })
    .join('');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

module.exports = {
  salt,
  md5: (value) => md5(value),
  generatePassword: () => generatePassword(),
  onlyLetterNumberDot,
  onlyLetterNumberDotUnderscore,
  transliterate,
  isNumeric,
  groupBy,
};
