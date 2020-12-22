const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const msd = (array, aux, transform, low, high, index, radix) => {
  if (high <= low) return;
  const count = new Array(radix + 2).fill(0);
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    count[code + 2] += 1;
  }
  for (let i = 0; i < radix + 1; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    aux[count[code + 1]] = array[i];
    count[code + 1] += 1;
  }
  for (let i = low; i <= high; i += 1) {
    array[i] = aux[i - low];
  }
  for (let i = 0; i < radix; i += 1) {
    msd(array, aux, transform, low + count[i], low + count[i + 1] - 1, index + 1, radix);
  }
};

const sort = (array, transform = defaultTransform, radix = 256) => {
  const aux = new Array(array.length);
  msd(array, aux, transform, 0, array.length - 1, 0, radix);
  return array;
};

module.exports = sort;
