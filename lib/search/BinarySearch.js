const { defaultCompare } = require('../util');

/**
 * The {@code BinarySearch} class provides static methods for binary
 * searching for an element in a sorted array of elements.
 * <p>
 * The <em>indexOf</em> operations takes logarithmic time in the worst case.
 * <p>
 *
 * @param array the array of elements, must be sorted in ascending order
 * @param compare the array elements comparison function
 *
 * @author Elvin Kosova
 */
const BinarySearch = (array, compare = defaultCompare) => {
  /**
   * Calculate the mid index between low index and high index.
   *
   * @param lo low index
   * @param hi high index
   * @return mid index between low index and high index
   */
  const getMid = (lo, hi) => (lo + Math.floor((hi - lo) / 2));

  /**
   * Returns the index of the specified key in the specified array.
   *
   * @param key the search key
   * @return index of key in array {@code a} if present; {@code -1} otherwise
   */
  const indexOf = (key) => {
    let lo = 0;
    let hi = array.length - 1;
    while (lo <= hi) {
      // Key is in a[lo..hi] or not present.
      const mid = getMid(lo, hi);
      const cmp = compare(key, array[mid]);
      if (cmp < 0) hi = mid - 1;
      else if (cmp > 0) lo = mid + 1;
      else return mid;
    }
    return -1;
  };

  /**
   * Returns the floor index of the specified key in the specified array.
   *
   * @param key the search key
   * @return floor index of key in array
   */
  const floorOf = (key) => {
    let lo = 0;
    let hi = array.length - 1;
    while (lo <= hi) {
      // Key is in a[lo..hi] or not present.
      const mid = getMid(lo, hi);
      const cmp = compare(key, array[mid]);
      if (cmp > 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return hi;
  };

  /**
   * Returns the ceiling index of the specified key in the specified array.
   *
   * @param key the search key
   * @return ceiling index of key in array
   */
  const ceilingOf = (key) => {
    let lo = 0;
    let hi = array.length - 1;
    while (lo <= hi) {
      // Key is in a[lo..hi] or not present.
      const mid = getMid(lo, hi);
      const cmp = compare(key, array[mid]);
      if (cmp < 0) hi = mid - 1;
      else lo = mid + 1;
    }
    return lo;
  };

  return Object.freeze({
    indexOf,
    floorOf,
    ceilingOf,
  });
};

module.exports = BinarySearch;
