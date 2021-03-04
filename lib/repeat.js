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
  const n = array.length;
  let radix = -Infinity;
  range(0, n - 1, (i) => {
    const code = transform(array[i], index);
    radix = radix > code ? radix : code;
  });
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  range(0, n - 1, (i) => {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  });
  range(0, radix, (i) => {
    count[i + 1] += count[i];
  });
  range(0, n - 1, (i) => {
    const code = transform(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  });
  range(0, n - 1, (i) => {
    array[i] = aux[i];
  });
};

const sort = (array, transform = defaultTransform) => {
  const n = array.length;
  const aux = new Array(n);
  let width = 0;
  range(0, n - 1, (i) => {
    const w = array[i].length;
    width = width < w ? w : width;
  });
  for (let i = width - 1; i >= 0; i -= 1) {
    lsd(array, aux, transform, i);
  }
  return array;
};

module.exports = sort;
