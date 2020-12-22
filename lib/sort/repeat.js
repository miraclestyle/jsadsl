const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defaultCompare) => (compare(a, b) < 0);

const merge = (array, aux, compare, low, mid, high) => {
  let left = low;
  let right = mid + 1;
  for (let i = low; i <= high; i += 1) {
    if (left > mid) {
      array[i] = aux[right];
      right += 1;
    } else if (right > high) {
      array[i] = aux[left];
      left += 1;
    } else if (less(aux[right], aux[left], compare)) {
      array[i] = aux[right];
      right += 1;
    } else {
      array[i] = aux[left];
      left += 1;
    }
  }
};

const insertion = (array, compare, low, high) => {
  for (let i = low + 1; i <= high; i += 1) {
    let j = i;
    while (j > low && less(array[j], array[j - 1], compare)) {
      const temp = array[j - 1];
      array[j - 1] = array[j];
      array[j] = temp;
      j -= 1;
    }
  }
};

const mergesort = (array, aux, compare, low, high) => {
  if (high <= low + 10) {
    insertion(array, compare, low, high);
    return;
  }
  const mid = low + Math.floor((high - low) / 2);
  mergesort(aux, array, compare, low, mid);
  mergesort(aux, array, compare, mid + 1, high);
  merge(array, aux, compare, low, mid, high);
};

const sort = (array, compare) => {
  const aux = array.slice();
  mergesort(array, aux, compare, 0, array.length - 1);
  return array;
};

module.exports = sort;
