const swap = (array, i, j) => {
  [array[i], array[j]] = [array[j], array[i]];
};

const randomInt = (low, high) => {
  const start = typeof high !== 'number' ? 0 : low;
  const end = typeof high !== 'number' ? low : high;
  const random = Math.random();
  const coefficient = end - start;
  const net = Math.floor(coefficient * random);
  const result = start + net;
  return result;
};

const shuffle = (array, low = 0, high = array.length) => {
  for (let i = low; i < high; i += 1) {
    const r = randomInt(i, high);
    swap(array, i, r);
  }
};

module.exports = shuffle;
