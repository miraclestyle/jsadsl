const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const ref = ('a').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - ref;
};

const range = (low, high, cb) => {
  for (let i = low; i <= high; i += 1) {
    cb(i);
  }
};

const kic = (array, aux, transform, index) => {
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
};

const sort = (array, transform = defaultTransform) => {
  let max = 0;
  for (let i = 0; i < array.length; i += 1) {
    const width = array[i].length;
    max = width > max ? width : max;
  }

};

module.exports = sort;
