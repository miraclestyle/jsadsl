/**
 * The {@code BoyerMoore} class finds the first occurrence of a pattern string
 * in a text string.
 * <p>
 * This implementation uses the Boyer-Moore algorithm (with the bad-character
 * rule, but not the strong good suffix rule).
 * <p>
 *
 * @author Elvin Kosova
 */
const BoyerMoore = (pattern, radix = 256) => {
  /**
   * Generate the bad-character skip array.
   *
   * @param pat the pattern string
   * @param R the string alphabet size
   * @return the generated bad-character skip array
   */
  const rightGenerator = (pat, R) => {
    // position of rightmost occurrence of c in the pattern
    const right = new Array(R).fill(-1);
    for (let i = 0; i < pat.length; i += 1) {
      right[pat.charCodeAt(i)] = i;
    }
    return right;
  };

  const right = rightGenerator(pattern, radix); // the bad-character skip array

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param txt the text string
   * @return the index of the first occurrence of the pattern string
   * in the text string; -1 if no such match
   */
  const search = (text) => {
    const m = pattern.length; // length of pattern
    const n = text.length; // length of text
    let skip;
    for (let i = 0; i <= n - m; i += skip) {
      skip = 0;
      for (let j = m - 1; j >= 0; j -= 1) {
        if (pattern.charCodeAt(j) !== text.charCodeAt(i + j)) {
          skip = Math.max(1, j - right[text.charCodeAt(i + j)]);
          break;
        }
      }
      if (skip === 0) return i; // found
    }
    return -1; // not found
  };

  return Object.freeze({ search });
};

module.exports = BoyerMoore;
