/**
 * The {@code RabinKarp} class finds the first occurrence of a pattern string
 * in a text string.
 * <p>
 * This implementation uses the Rabin-Karp algorithm.
 * <p>
 *
 * @author Elvin Kosova
 */
const RabinKarp = (pattern, radix = 256) => {
  /**
   * Generate long random prime number.
   *
   * @return generated long random prime number
   */
  const primeGenerator = () => (10 ** 7 + 19);

  /**
   * Generate exponent base.
   *
   * @param pat the pattern string
   * @param R the string alphabet size
   * @param P the long random prime number
   * @return precomputed exponent base
   */
  const baseGenerator = (pat, R, P) => {
    const m = pat.length;
    // precompute R^(m-1) % q for use in removing leading digit
    let B = 1;
    for (let i = 1; i <= m - 1; i += 1) {
      B = (R * B) % P;
    }
    return B;
  };

  /**
   * Generate hash.
   *
   * @param key the key string to be hashed
   * @param m the pattern string length
   * @param R the string alphabet size
   * @param P the long random prime number
   * @return generated hash
   */
  const hash = (key, m, R, P) => {
    let h = 0;
    for (let i = 0; i < m; i += 1) {
      h = (R * h + key.charCodeAt(i)) % P;
    }
    return h;
  };

  /**
   * Las Vegas version: does pat match txt[i...i-m+1]
   * Monte Carlo version: always return true
   *
   * @param txt the text string to be compared
   * @param pat the pattern string to be used for comparison
   * @param i the text starting index to be used for verification
   * @param m the pattern string length
   * @return boolean
   */
  const check = (txt, pat, i, m) => {
    for (let j = 0; j < m; j += 1) {
      if (pat.charCodeAt(j) !== txt.charCodeAt(i + j)) return false;
    }
    return true;
  };

  const P = primeGenerator();
  const B = baseGenerator(pattern, radix, P);
  const patHash = hash(pattern, pattern.length, radix, P);

  /**
   * Returns the index of the first occurrrence of the pattern string
   * in the text string.
   *
   * @param txt the text string
   * @return the index of the first occurrence of the pattern string
   * in the text string; -1 if no such match
   */
  const search = (text) => {
    const n = text.length;
    const m = pattern.length;
    if (n < m) return -1;
    let txtHash = hash(text, m, radix, P);
    // check for match at offset 0
    if ((patHash === txtHash) && check(text, pattern, 0, m)) return 0;
    // check for hash match; if hash match, check for exact match
    for (let i = m; i < n; i += 1) {
      // Remove leading digit, add trailing digit, check for match.
      const remove = (B * text.charCodeAt(i - m)) % P;
      txtHash = (txtHash + P - remove) % P;
      txtHash = (txtHash * radix + text.charCodeAt(i)) % P;
      // match
      const offset = i - m + 1;
      if ((patHash === txtHash) && check(text, pattern, offset, m)) return offset;
    }
    // no match
    return -1;
  };

  return Object.freeze({ search });
};

module.exports = RabinKarp;
