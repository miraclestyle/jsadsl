const defaultTransform = (value, index) => {
  const reference = ('A').charCodeAt(0);
  const code = index < value.length ? value.charCodeAt(index) : reference + 1;
  return code - reference;
};

const radix = (array, transform, low, high, index) => {
  let r = -Infinity;
  for (let i = low; i < high; i += 1) {
    const code = transform(array[i], index);
    r = code > r ? code : r;
  }
  return r;
};

const msd = (array, aux, transform, low, high, index) => {
  if (high <= low) return;
  const r = radix(array, transform, low, high, index) + 1;
  const count = new Array(r + 2).fill(0);
  for (let i = low; i <= high; i += 1) {
    count[transform(array[i], index) + 2] += 1;
  }
  for (let i = 0; i < r + 1; i += 1) {
    count[i + 1] += count[i];
  }
  for (let i = low; i <= high; i += 1) {
    const code = transform(array[i], index);
    aux[count[code + 1]] = array[i];
    count[code + 1] += 1;
  }
  for (let i = low; i <= high; i += 1) {
    array[i] = aux[i - low];
  }
  for (let i = 0; i < r; i += 1) {
    const newLow = low + count[i];
    const newHigh = low + count[i + 1] - 1;
    const newIndex = index + 1;
    msd(array, aux, transform, newLow, newHigh, newIndex);
  }
};

const sort = (array, transform, low = 0, high = array.length) => {
  const t = typeof transform === 'function' ? transform : defaultTransform;
  const source = array.slice(low, high);
  const aux = new Array(source.length);
  msd(source, aux, t, 0, source.length - 1, 0);
  for (let i = 0; i < source.length; i += 1) {
    array[low + i] = source[i];
  }
};

module.exports = sort;
