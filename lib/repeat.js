const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const equal = (a, b, compare) => (compare(a, b) === 0);

const search = (array, compare = defaultCompare) => {
  let count = 0;
  let element = null;
  for (let i = 0; i < array.length; i += 1) {
    if (count === 0) element = array[i];
    if (equal(element, array[i], compare)) count += 1;
    else count -= 1;
  }
  return element;
};

module.exports = search;
