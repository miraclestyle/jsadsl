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
const InsertionW = () => {
  /* **************************************************************************
   * Helper sorting functions.
   ************************************************************************** */

  /**
   * Default comparator function that determines element precedence
   *
   * @param v the index of an element to be compared
   * @param w the other index of an element to be compared
   * @param comparator the comparator specifying the order
   * @return boolean true if array[v] < array[y]; otherwise false
   */
  const defaultComparator = (v, w) => {
    if (v < w) return -1;
    if (v > w) return 1;
    return 0;
  };

  /**
   * Is an array element at v less than an array element at w?
   *
   * @param v the index of an element to be compared
   * @param w the other index of an element to be compared
   * @param comparator the comparator specifying the order
   * @return boolean true if array[v] < array[y]; otherwise false
   */
  const less = (v, w, comparator) => (comparator(v, w) < 0);

  /**
   * Exchange array[i] and array[j]
   *
   * @param array the array
   * @param i the index of an element to be exchanged
   * @param j the other index of an element to be exchanged
   */
  const exch = (array, i, j) => {
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  };

  /* **************************************************************************
   * Check if array is sorted - useful for debugging.
  ************************************************************************** */

  /**
   * Verifies if the subarray array[lo..hi) is sorted in correct order
   * using a comparator.
   *
   * @param array the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   * @return boolean true if the array is sorted; otherwise false
   */
  const isSorted = (array, lo, hi, comparator) => {
    for (let i = lo + 1; i < hi; i += 1) {
      if (less(array[i], array[i - 1], comparator)) return false;
    }
    return true;
  };

  /**
   * Asserts that the subarray array[lo..hi) is sorted in correct order
   * using a comparator.
   *
   * @param array the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   * @throw an Error if the subarray array[lo..hi) is not sorted
   */
  const assertIsSorted = (array, lo, hi, comparator) => {
    if (!isSorted(array, lo, hi, comparator)) {
      throw new Error('Array not sorted!');
    }
  };

  /**
   * Rearranges the subarray a[lo..hi) in correct order
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
   * the array in correct order without changing the original array
   *
   * @param array the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   * @return a permutation {@code p[]} such that
   * {@code array[p[0]]}, {@code array[p[1]]},
   * ..., {@code array[p[n-1]]} are in ascending order
   */
  const indexSort = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    const n = array.length;
    const index = Array.from(new Array(n), (e, i) => (i));
    for (let i = lo + 1; i < hi; i += 1) {
      for (let j = i; j > lo && less(array[index[j]], array[index[j - 1]], comparator); j -= 1) {
        exch(index, j, j - 1);
      }
    }
    return index;
  };

  return Object.freeze({
    sort,
    indexSort,
  });
};

module.exports = InsertionW;
