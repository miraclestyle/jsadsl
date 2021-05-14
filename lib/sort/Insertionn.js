/**
 * The {@code Insertion} class provides static methods for sorting an
 * array using insertion sort.
 * <p>
 * In the worst case, this implementation makes ~ &frac12; <em>n</em><sup>2</sup>
 * compares and ~ &frac12; <em>n</em><sup>2</sup> exchanges to sort an array
 * of length <em>n</em>. So, it is not suitable for sorting large arbitrary
 * arrays. More precisely, the number of exchanges is exactly equal to the
 * number of inversions. So, for example, it sorts a partially-sorted array
 * in linear time.
 * <p>
 * This sorting algorithm is stable.
 * It uses &Theta;(1) extra memory (not including the input array).
 * <p>
 *
 * @author Elvin Kosova
 */
const Insertion = () => {
  /* *******************************************************
   * Helper sorting functions.
  ******************************************************* */

  const defaultComparator = (v, w) => {
    if (v < w) return -1;
    if (v > w) return 1;
    return 0;
  };

  // is v < w ?
  const less = (v, w, comparator) => (comparator(v, w) < 0);

  // exchange a[i] and a[j]
  const exch = (array, i, j) => {
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  };

  /* *******************************************************
   * Check if array is sorted - useful for debugging.
  ******************************************************* */

  // is the array a[lo..hi) sorted
  const isSorted = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    for (let i = lo + 1; i < hi; i += 1) {
      if (less(array[i], array[i - 1], comparator)) return false;
    }
    return true;
  };

  const assertIsSorted = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    if (!isSorted(array, lo, hi, comparator)) {
      throw new Error('Array is unsorted!');
    }
  };

  // print array to standard output
  const show = (array) => {
    for (let i = 0; i < array.length; i += 1) {
      console.log(array[i]);
    }
  };

  /**
   * Rearranges the subarray a[lo..hi) in correct order,
   * using a comparator.
   *
   * @param array the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   */
  const sort = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    for (let i = lo + 1; i < hi; i += 1) {
      for (let j = i; j > lo && less(array[j], array[j - 1], comparator); j -= 1) {
        exch(array, j, j - 1);
      }
    }
    assertIsSorted(array, lo, hi, comparator);
  };

  /**
   * Returns a permutation that gives the elements in
   * the array in ascending order without changing the original array
   *
   * @param array the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   * @return a permutation {@code p[]} such that
   * {@code array[p[0]]}, {@code array[p[1]]},
   * ..., {@code array[p[n-1]]} are in correct order
   */
  const indexSort = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    const n = array.length;
    const index = Array.from(new Array(n), (e, i) => (i));
    for (let i = lo + 1; i < hi; i += 1) {
      for (let j = i; j > 0 && less(array[index[j]], array[index[j - 1]], comparator); j -= 1) {
        exch(index, j, j - 1);
      }
    }
    return index;
  };

  return Object.freeze({
    sort,
    indexSort,
    show,
  });
};

module.exports = Insertion;
