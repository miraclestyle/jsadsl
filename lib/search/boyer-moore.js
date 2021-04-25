const { equal } = require('../util');

const search = (array, compare) => {
  let counter = 0;
  let majority = null;
  for (let i = 0; i < array.length; i += 1) {
    if (counter === 0) majority = array[i];
    if (equal(majority, array[i], compare)) counter += 1;
    else counter -= 1;
  }
  return majority;
};

module.exports = search;
