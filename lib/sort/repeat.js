const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform = defaultTransform, index = 0) => {
  const n = array.length;
  const aux = new Array(n);
  let radix = -Infinity;
  for (let i = 0; i < n; i += 1) {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  }
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  for (let i = 0; i < n; i += 1) {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  }
  for (let i = 0; i < radix; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = 0; i < n; i += 1) {
    const code = transform(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  }
  for (let i = 0; i < n; i += 1) {
    array[i] = aux[i];
  }
};

module.exports = sort;
