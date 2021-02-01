const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('a').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const forRange = (start, end, cb) => {
  for (let i = start; i <= end; i += 1) {
    cb(i);
  }
};

const kic = (array, aux, transform, index) => {
  const n = array.length;
  let radix = -Infinity;
  forRange(0, n - 1, (i) => {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  });
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  forRange(0, n - 1, (i) => {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  });
  forRange(0, radix - 1, (i) => {
    count[i + 1] += count[i];
  });
  forRange(0, n - 1, (i) => {
    const code = transform(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  });
  forRange(0, n - 1, (i) => {
    array[i] = aux[i];
  });
  return array;
};

const sort = (array, transform = defaultTransform) => {
  const aux = new Array(array.length);
  kic(array, aux, transform, 0);
  return array;
};

module.exports = sort;
