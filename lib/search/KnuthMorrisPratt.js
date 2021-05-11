/**
 * The {@code KMP} class finds the first occurrence of a pattern string
 * in a text string.
 * <p>
 * This implementation uses a version of the Knuth-Morris-Pratt substring search
 * algorithm. The version takes time proportional to <em>n</em> + <em>m R</em>
 * in the worst case, where <em>n</em> is the length of the text string,
 * <em>m</em> is the length of the pattern, and <em>R</em> is the alphabet size.
 * It uses extra space proportional to <em>m R</em>.
 * <p>
 *
 * @author Elvin Kosova
 */
const KnuthMorrisPratt = (pattern, radix = 256) => {
  /**
   * Build DFA from pattern.
   *
   * @param pat the pattern string
   * @param R the string alphabet size
   */
  const dfaGenerator = (pat, R) => {
    const m = pat.length;
    const dfa = Array.from(new Array(R), () => (new Array(m).fill(0)));
    dfa[pat.charCodeAt(0)][0] = 1;
    for (let x = 0, j = 1; j < m; j += 1) {
      for (let c = 0; c < R; c += 1) {
        dfa[c][j] = dfa[c][x]; // Copy mismatch cases.
      }
      dfa[pat.charCodeAt(j)][j] = j + 1; // Set match case.
      x = dfa[pat.charCodeAt(j)][x]; // Update restart state.
    }
    return dfa;
  };

  const dfa = dfaGenerator(pattern, radix); // the KMP automoton

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param text the text string
   * @return the index of the first occurrence of the pattern string
   * in the text string; -1 if no such match
   */
  const search = (text) => {
    // simulate operation of DFA on text
    const m = pattern.length; // length of pattern
    const n = text.length; // length of text
    let i;
    let j;
    for (i = 0, j = 0; i < n && j < m; i += 1) {
      j = dfa[text.charCodeAt(i)][j];
    }
    if (j === m) return i - m; // found
    return -1; // not found
  };

  return Object.freeze({
    search,
  });
};

module.exports = KnuthMorrisPratt;
