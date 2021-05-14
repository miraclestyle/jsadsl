/**
 * The {@code Knuth} class provides a client for reading in a
 * sequence of strings and <em>shuffling</em> them using the Knuth (or Fisher-Yates)
 * shuffling algorithm. This algorithm guarantees to rearrange the
 * elements in uniformly random order, under
 * the assumption that Math.random() generates independent and
 * uniformly distributed numbers between 0 and 1.
 * <p>
 *
 * @author Elvin Kosova
 */
const Shuffle = () => {
  /**
   * Rearranges an array of objects in uniformly random order
   * (under the assumption that {@code Math.random()}
   * generates independent and uniformly distributed
   * numbers between 0 and 1).
   *
   * @param array the array to be shuffled
   */
  const shuffle = (array) => {
    const n = array.length;
    for (let i = 0; i < n; i += 1) {
      // choose index uniformly in [0, i]
      const r = Math.floor(Math.random() * (i + 1));
      const swap = array[r];
      array[r] = array[i];
      array[i] = swap;
    }
  };

  /**
   * Rearranges an array of objects in uniformly random order
   * (under the assumption that {@code Math.random()}
   * generates independent and uniformly distributed
   * numbers between 0 and 1).
   *
   * @param array the array to be shuffled
   */
  const shuffleAlternate = (array) => {
    const n = array.length;
    for (let i = 0; i < n; i += 1) {
      // choose index uniformly in [i, n-1]
      const r = i + Math.floor(Math.random() * (n - i));
      const swap = array[r];
      array[r] = array[i];
      array[i] = swap;
    }
  };

  return Object.freeze({
    shuffle,
    shuffleAlternate,
  });
};

module.exports = Shuffle;
