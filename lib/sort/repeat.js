const randomInt = (low, high) => {
  const start = typeof high === 'number' ? low : 0;
  const end = typeof high === 'number' ? high : low;
  const variable = Math.random();
  const coefficient = (end - start);
  const product = coefficient * variable;
  const floor = Math.floor(product);
  const result = start + floor;
  return result;
};

const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const shuffle = (array, low = 0, high = array.length) => {
  for (let i = low; i < high; i += 1) {
    const r = randomInt(i, high);
    swap(array, i, r);
  }
};

module.exports = shuffle;
