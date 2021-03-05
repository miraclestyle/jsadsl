const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const ref = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - ref;
};

const range = (low, high, callback) => {
  for (let i = low; i <= high; i += 1) {
    callback(i);
  }
};

const lsd = (array, aux, transform, index) => {
  const n = array.length - 1;
  let radix = -Infinity;
  range(0, n, (i) => {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  });
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  range(0, n, (i) => {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  });
  range(0, radix - 1, (i) => {
    count[i + 1] += count[i];
  });
  range(0, n, (i) => {
    const code = transform(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  });
  range(0, n, (i) => {
    array[i] = aux[i];
  });
};

const sort = (array, transform = defaultTransform) => {
  const aux = new Array(array.length);
  let max = 0;
  range(0, array.length - 1, (i) => {
    const width = array[i].length;
    max = width > max ? width : max;
  });
  for (let index = max - 1; index >= 0; index -= 1) {
    lsd(array, aux, transform, index);
  }
  return array;
};

module.exports = sort;
