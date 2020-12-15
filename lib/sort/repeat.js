const defaultTransform = (value, index) => (
  value.charCodeAt(index) - ('A').charCodeAt(0)
);

const sort = (array, transform = defaultTransform) => {
  const n = array.length;
  const aux = new Array(n);
  let index = -Infinity;
  for (let i = 0; i < n; i += 1) {
    index = array[i].length > index ? array[i].length : index;
  }
  for (let key = index - 1; key >= 0; key -= 1) {
    let radix = -Infinity;
    for (let i = 0; i < n; i += 1) {
      const code = transform(array[i], key);
      radix = code > radix ? code : radix;
    }
    radix += 1;
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
