const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform = defaultTransform, radix = 256) => {
  let width = 0;
  for (let i = 0; i < array.length; i += 1) {
    width = array[i].length > width ? array[i].length : width;
  }
  const n = array.length;
  const aux = new Array(n);
  for (let index = width - 1; index >= 0; index -= 1) {
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
  }
};

module.exports = sort;
