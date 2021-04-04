const random = (low, high) => (low + Math.floor((high - low) * Math.random()));

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const shuffle = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    const r = random(i, array.length);
    swap(array, i, r);
  }
  return array;
};

module.exports = shuffle;
