const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = value.charCodeAt(index);
  return code - reference;
};

const sort = (array, transform, index = 0) => {
  const trans = typeof transform === 'function' ? transform : defaultTransform;
  let radix = -Infinity;
  const low = 0;
  const high = array.length;
  for (let i = low; i < high; i += 1) {
    const code = trans(array[i], index);
    if (code > radix) {
      radix = code;
    }
  }
  const aux = new Array(high);
  const count = new Array(radix + 1).fill(0);
  for (let i = low; i < high; i += 1) {
    count[trans(array[i], index) + 1] += 1;
  }
  for (let i = 0; i < radix; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = low; i < high; i += 1) {
    const code = trans(array[i], index);
    aux[count[code]] = array[i];
    count[code] += 1;
  }
  for (let i = low; i < high; i += 1) {
    array[i] = aux[i];
  }
};

module.exports = sort;
