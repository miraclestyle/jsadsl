const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform = defaultTransform, low = 0, high = array.length, index = 0) => {
  let radix = -Infinity;
  const source = array.slice(low, high);
  const aux = new Array(source.length);
  for (let i = 0; i < source.length; i += 1) {
    const code = transform(source[i], index);
    if (code > radix) {
      radix = code;
    }
  }
  const count = new Array(radix + 1).fill(0);
  for (let i = 0; i < source.length; i += 1) {
    count[transform(source[i], index) + 1] += 1;
  }
  for (let i = 0; i < radix; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = 0; i < source.length; i += 1) {
    const code = transform(source[i], index);
    aux[count[code]] = source[i];
    count[code] += 1;
  }
  for (let i = 0; i < source.length; i += 1) {
    array[low + i] = aux[i];
  }
};

module.exports = sort;
