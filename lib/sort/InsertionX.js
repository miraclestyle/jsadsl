/**
 * The {@code InsertionX} class provides static methods for sorting
 * an array using an optimized version of insertion sort (with half exchanges
 * and a sentinel).
 * <p>
 * In the worst case, this implementation makes ~ 1/2 <em>n</em><sup>2</sup>
 * compares to sort an array of length <em>n</em>.
 * So, it is not suitable for sorting large arrays
 * (unless the number of inversions is small).
 * <p>
 * This sorting algorithm is stable.
 * It uses &Theta;(1) extra memory (not including the input array).
 * <p>
 *
 * @author Elvin Kosova
 */
const InsertionX = () => {
  /* **************************************************************************
   *  Helper sorting functions.
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
   * @param array the array to be sorted
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   */
  const sort = (array, lo = 0, hi = array.length, comparator = defaultComparator) => {
    // put smallest element in position to serve as sentinel
    let exchanges = 0;
    for (let i = hi - 1; i > lo; i -= 1) {
      if (less(array[i], array[i - 1], comparator)) {
        exch(array, i, i - 1);
        exchanges += 1;
      }
    }
    if (exchanges === 0) return;
    // insertion sort with half-exchanges
    for (let i = lo + 2; i < hi; i += 1) {
      const v = array[i];
      let j = i;
      while (less(v, array[j - 1], comparator)) {
        array[j] = array[j - 1];
        j -= 1;
      }
      array[j] = v;
    }
    assertIsSorted(array, lo, hi, comparator);
  };

  return Object.freeze({
    sort,
  });
};

module.exports = InsertionX;
