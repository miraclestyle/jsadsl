const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const combine = (array, aux, compare, low, mid, high) => {
  for (let i = low; i <= high; i += 1) {
    aux[i] = array[i];
  }
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

const divide = (array, aux, compare, low, high) => {
  if (high <= low) return;
  const mid = low + Math.floor((high - low) / 2);
  divide(array, aux, compare, low, mid);
  divide(array, aux, compare, mid + 1, high);
  combine(array, aux, compare, low, mid, high);
};

const sort = (array, compare) => {
  const aux = new Array(array.length);
  divide(array, aux, compare, 0, array.length - 1);
};

module.exports = sort;

const a = [5, 2, 4, 6, 1, 3];
console.log(a);
sort(a);
console.log(a);
