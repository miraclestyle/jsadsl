/**
 * The {@code LSD} class provides static methods for sorting an
 * array of <em>w</em>-character strings or 32-bit integers using LSD radix sort.
 * <p>
 *
 * @author Elvin Kosova
 */
const LSD = () => {
  const BITS_PER_BYTE = 8;

  const defGetCode = (string, index) => (string.charCodeAt(index));

  /**
   * Range iterator
   *
   * @param array the array to be sorted
   * @param aux the aux array used for value distribution
   * @param index the current character index being sorted
   * @param R the radix of the character set being sorted
   * @param getCode the char-to-code conversion function
   */
  const range = (low, high, callback, reverse = false) => {
    if (reverse) {
      for (let i = high; i >= low; i -= 1) {
        callback(i);
      }
    } else {
      for (let i = low; i <= high; i += 1) {
        callback(i);
      }
    }
  };

  /**
   * Sort array by key-indexed counting on index-th character.
   *
   * @param array the array to be sorted
   * @param aux the aux array used for value distribution
   * @param index the current character index being sorted
   * @param R the radix of the character set being sorted
   * @param getCode the char-to-code conversion function
   */
  const keyIndexCount = (array, aux, index, R, getCode) => {
    const n = array.length;
    const count = new Array(R + 1).fill(0);
    // compute frequency counts
    range(0, n - 1, (i) => {
      count[getCode(array[i], index) + 1] += 1;
    });
    // compute cumulates
    range(0, R - 1, (i) => {
      count[i + 1] += count[i];
    });
    // distribute values
    range(0, n - 1, (i) => {
      const code = getCode(array[i], index);
      aux[count[code]] = array[i];
      count[code] += 1;
    });
    // copy back
    range(0, n - 1, (i) => {
      array[i] = aux[i];
    });
    return array;
  };

  /**
   * Rearranges the array of w-character strings in ascending order.
   *
   * @param array the array to be sorted
   * @param w the number of characters per string
   */
  const stringArraySort = (array, w, R = 256, getCode = defGetCode) => {
    const n = array.length;
    const aux = new Array(n);
    range(w - 1, 0, (index) => {
      keyIndexCount(array, aux, index, R, getCode);
    }, true);
    return array;
  };

  /**
   * Rearranges the array of 32-bit integers in ascending order.
   * This is about 2-3x faster than Arrays.sort().
   *
   * @param array the array to be sorted
   */
  const integerArraySort = (array) => {
    const BITS = 32; // each int is 32 bits
    const R = 1 << BITS_PER_BYTE; // each bytes is between 0 and 255
    const MASK = R - 1; // 0xFF
    const w = BITS / BITS_PER_BYTE; // each int is 4 bytes
    const n = array.length;
    const aux = new Array(n);
    range(0, w - 1, (d) => {
      // compute frequency counts
      const count = new Array(R + 1).fill(0);
      range(0, n - 1, (i) => {
        const c = (array[i] >> BITS_PER_BYTE * d) & MASK;
        count[c + 1] += 1;
      });
      // compute cumulates
      range(0, R - 1, (i) => {
        count[i + 1] += count[i];
      });
      // for most significant byte, 0x80-0xFF comes before 0x00-0x7F
      if (d === w - 1) {
        const shift1 = count[R] - count[R / 2];
        const shift2 = count[R / 2];
        range(0, Math.floor(R / 2), (i) => {
          count[i] += shift1;
        });
        range(Math.floor(R / 2), R - 1, (i) => {
          count[i] -= shift2;
        });
      }
      // move data
      range(0, n - 1, (i) => {
        const c = (array[i] >> BITS_PER_BYTE * d) & MASK;
        aux[count[c]] = array[i];
        count[c] += 1;
      });
      // copy back
      range(0, n - 1, (i) => {
        array[i] = aux[i];
      });
    });
    return array;
  };

  return Object.freeze({
    stringArraySort,
    integerArraySort,
  });
};

module.exports = LSD;

const lsd = LSD();
console.log(lsd.integerArraySort([5, 2, 8, 6, 1, 7, 4, 3]));
console.log(lsd.stringArraySort(['cba', 'cab', 'bca', 'bac', 'acb', 'abc'], 3));
