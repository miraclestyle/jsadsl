const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const keyIndexCounting = (array, aux, transform, index) => {
  let radix = -Infinity;
  for (let i = 0; i < array.length; i += 1) {
    const code = transform(array[i], index);
    radix = code > radix ? code : radix;
  }
  radix += 1;
  const count = new Array(radix + 1).fill(0);
  for (let i = 0; i < array.length; i += 1) {
    const code = transform(array[i], index);
    count[code + 1] += 1;
  }
  for (let i = 0; i < radix; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = 0; i < array.length; i += 1) {
    const code = transform(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  }
  for (let i = 0; i < array.length; i += 1) {
    array[i] = aux[i];
  }
};

const sort = (array, transform = defaultTransform) => {
  const n = array.length;
  let keyWidth = 0;
  for (let i = 0; i < n; i += 1) {
    keyWidth = array[i].length > keyWidth ? array[i].length : keyWidth;
  }
  const aux = new Array(n);
  for (let index = keyWidth - 1; index >= 0; index -= 1) {
    keyIndexCounting(array, aux, transform, index);
  }
  return array;
};

module.exports = sort;
