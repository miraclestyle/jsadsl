const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform = defaultTransform, radix = 256) => {
  const n = array.length;
  let index = 0;
  const aux = new Array(n);
  for (let i = 0; i < n; i += 1) {
    const w = array[i].length;
    if (w > index) index = w;
  }
  for (let key = index - 1; key >= 0; key -= 1) {
    const count = new Array(radix + 1).fill(0);
    for (let i = 0; i < n; i += 1) {
      const code = transform(array[i], key);
      count[code + 1] += 1;
    }
    for (let i = 0; i < radix; i += 1) {
      count[i + 1] += count[i];
    }
    for (let i = 0; i < n; i += 1) {
      const code = transform(array[i], key);
      aux[count[code]] = array[i];
      count[code] += 1;
    }
    for (let i = 0; i < n; i += 1) {
      array[i] = aux[i];
    }
  }
};

module.exports = sort;
