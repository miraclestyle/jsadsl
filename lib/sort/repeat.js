const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform = defaultTransform, radix = 256) => {
  const count = new Array(radix + 1).fill(0);
  const aux = new Array(array.length);
  for (let i = 0; i < array.length; i += 1) {
    const code = transform(array[i], 0);
    count[code + 1] += 1;
  }
  for (let i = 0; i < radix; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = 0; i < array.length; i += 1) {
    const code = transform(array[i], 0);
    aux[count[code]] = array[i];
    count[code] += 1;
  }
  for (let i = 0; i < array.length; i += 1) {
    array[i] = aux[i];
  }
};

module.exports = sort;
