const defaultTransform = (value, index) => {
  if (index >= value.length) return -1;
  const reference = ('a').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const kic = (array, aux, transform, index) => {
  const n = array.length;
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

const sort = (array, transform = defaultTransform) => {
  const aux = new Array(array.length);
  let index = 0;
  for (let i = 0; i < array.length; i += 1) {
    const word = array[i].length;
    index = word > index ? word : index;
  }
  for (let w = index - 1; w >= 0; w -= 1) {
    kic(array, aux, transform, w);
  }
  return array;
};

module.exports = sort;
