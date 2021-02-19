const {
  getType,
  defaultCompare,
  less,
  more,
  equal,
} = require('./compare');

const {
  hashUndefined,
  hashNull,
  hashBoolean,
  hashInteger,
  hashFloat,
  hashString,
} = require('./hash');

const randomInt = require('./random');
const swap = require('./swap');

module.exports = {
  getType,
  defaultCompare,
  less,
  more,
  equal,
  hashUndefined,
  hashNull,
  hashBoolean,
  hashInteger,
  hashFloat,
  hashString,
  randomInt,
  swap,
};
