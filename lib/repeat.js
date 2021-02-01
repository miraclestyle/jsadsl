const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('a').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const forRange = (start, end, callback) => {
  for (let i = start; i <= end; i += 1) {
    callback(i);
  }
};

const msd = (array, aux, transform, low, high, index) => {
  if (high <= low) return;
  let radix = -Infinity;
  forRange(low, high, (i) => {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  });
  radix += 1;
  const count = new Array(radix + 2).fill(0);
  forRange(low, high, (i) => {
    const code = transform(array[i], index);
    count[code + 2] += 1;
  });
  forRange(0, radix, (i) => {
    count[i + 1] += count[i];
  });
  forRange(low, high, (i) => {
    const code = transform(array[i], index);
    aux[count[code + 1]] = array[i];
    count[code + 1] += 1;
  });
  forRange(low, high, (i) => {
    array[i] = aux[i - low];
  });
  forRange(0, radix - 1, (i) => {
    msd(array, aux, transform, low + count[i], low + count[i + 1] - 1, index + 1);
  });
};

const sort = (array, transform = defaultTransform) => {
  const aux = new Array(array.length);
  msd(array, aux, transform, 0, array.length - 1, 0);
  return array;
};

module.exports = sort;
