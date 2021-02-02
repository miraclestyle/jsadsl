const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('a').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const range = (low, high, cb) => {
  for (let i = low; i <= high; i += 1) {
    cb(i);
  }
};

const kic = (array, transform, index) => {
  const n = array.length;
  const aux = new Array(n);
  let radix = -Infinity;
  range(0, n - 1, (i) => {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  });
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  range(0, n - 1, (i) => {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  });
  range(0, radix - 1, (i) => {
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
  kic(array, transform, 0);
  return array;
};
module.exports = sort;
