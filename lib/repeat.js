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

const sort = (array, transform = defaultTransform) => {
  const n = array.length - 1;
  const aux = new Array(array.length);
  let radix = -Infinity;
  forRange(0, n, (i) => {
    const code = transform(array[i], 0);
    radix = code > radix ? code : radix;
  });
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  forRange(0, n, (i) => {
    const code = transform(array[i], 0);
    count[code + 1] += 1;
  });
  forRange(0, radix - 1, (i) => {
    count[i + 1] += count[i];
  });
  forRange(0, n, (i) => {
    const code = transform(array[i], 0);
    aux[count[code]] = array[i];
    count[code] += 1;
  });
  forRange(0, n, (i) => {
    array[i] = aux[i];
  });
  return array;
};

module.exports = sort;
