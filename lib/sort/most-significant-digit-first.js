const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const msd = (array, aux, transform, low, high, index) => {
  if (high <= low) return;
  let radix = -Infinity;
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  }
  radix += 1;
  const count = new Array(radix + 2).fill(0);
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    count[code + 2] += 1;
  }
  for (let r = 0; r < radix + 1; r += 1) {
    count[r + 1] += count[r];
  }
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    aux[count[code + 1]] = array[i];
    count[code + 1] += 1;
  }
  for (let i = low; i <= high; i += 1) {
    array[i] = aux[i - low];
  }
  for (let r = 0; r < radix; r += 1) {
    msd(array, aux, transform, low + count[r], low + count[r + 1] - 1, index + 1);
  }
};

const sort = (array, transform = defaultTransform) => {
  const aux = new Array(array.length);
  msd(array, aux, transform, 0, array.length - 1, 0);
  return array;
};

module.exports = sort;
