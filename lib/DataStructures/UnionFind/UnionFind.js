/**
 * The {@code UF} class represents a <em>union–find data type</em>
 * (also known as the <em>disjoint-sets data type</em>).
 * It supports the classic <em>union</em> and <em>find</em> operations,
 * along with a <em>count</em> operation that returns the total number
 * of sets.
 * <p>
 * The union–find data type models a collection of sets containing
 * <em>n</em> elements, with each element in exactly one set.
 * The elements are named 0 through <em>n</em>–1.
 * Initially, there are <em>n</em> sets, with each element in its
 * own set. The <em>canonical element</em> of a set
 * (also known as the <em>root</em>, <em>identifier</em>,
 * <em>leader</em>, or <em>set representative</em>)
 * is one distinguished element in the set. Here is a summary of
 * the operations:
 * <ul>
 * <li><em>find</em>(<em>p</em>) returns the canonical element
 *      of the set containing <em>p</em>. The <em>find</em> operation
 *      returns the same value for two elements if and only if
 *      they are in the same set.
 * <li><em>union</em>(<em>p</em>, <em>q</em>) merges the set
 *      containing element <em>p</em> with the set containing
 *      element <em>q</em>. That is, if <em>p</em> and <em>q</em>
 *      are in different sets, replace these two sets
 *      with a new set that is the union of the two.
 * <li><em>count</em>() returns the number of sets.
 * </ul>
 * <p>
 * The canonical element of a set can change only when the set
 * itself changes during a call to <em>union</em>&mdash;it cannot
 * change during a call to either <em>find</em> or <em>count</em>.
 * <p>
 * This implementation uses <em>weighted quick union by rank</em>
 * with <em>path compression by halving</em>.
 * The constructor takes &Theta;(<em>n</em>) time, where
 * <em>n</em> is the number of elements.
 * The <em>union</em> and <em>find</em> operations take
 * &Theta;(log <em>n</em>) time in the worst case.
 * The <em>count</em> operation takes &Theta;(1) time.
 * Moreover, starting from an empty data structure with <em>n</em> sites,
 * any intermixed sequence of <em>m</em> <em>union</em> and <em>find</em>
 * operations takes <em>O</em>(<em>m</em> &alpha;(<em>n</em>)) time,
 * where &alpha;(<em>n</em>) is the inverse of
 * <a href = "https://en.wikipedia.org/wiki/Ackermann_function#Inverse">Ackermann's function</a>.
 * <p>
 *
 * @author Elvin Kosova
 */
const UnionFind = (n) => {
  if (n < 0) throw new Error('Invalid set number!');
  // parent[i] = parent of i
  const parent = Array.from(new Array(n), (e, i) => (i));
  // rank[i] = rank of subtree rooted at i
  const rank = new Array(n).fill(0);
  let c = n;

  /**
   * Validate index.
   *
   * @param p the index to validate
   * @throw an Error if p is out of range
   */
  const validate = (p) => {
    if (p < 0 || p >= n) {
      throw new Error(`index ${p} is not between 0 and ${n - 1}!`);
    }
  };

  /**
   * Returns the canonical element of the set containing element {@code p}.
   *
   * @param p an element
   * @return the canonical element of the set containing {@code p}
   * @throws IllegalArgumentException unless {@code 0 <= p < n}
   */
  const find = (p) => {
    validate(p);
    let i = p;
    while (i !== parent[i]) {
      parent[i] = parent[parent[i]]; // path compression by halving
      i = parent[i];
    }
    return i;
  };

  /**
   * Returns the number of sets.
   *
   * @return the number of sets (between {@code 1} and {@code n})
   */
  const count = () => (c);

  /**
   * Returns true if the two elements are in the same set.
   *
   * @param p one element
   * @param q the other element
   * @return {@code true} if {@code p} and {@code q} are in the same set;
   * {@code false} otherwise
   * @throws an Error unless both {@code 0 <= p < n} and {@code 0 <= q < n}
   */
  const connected = (p, q) => (find(p) === find(q));

  /**
   * Merges the set containing element {@code p} with the
   * the set containing element {@code q}.
   *
   * @param p one element
   * @param q the other element
   * @throws an Error unless both {@code 0 <= p < n} and {@code 0 <= q < n}
   */
  const union = (p, q) => {
    const rootP = find(p);
    const rootQ = find(q);
    if (rootP === rootQ) return;
    // make root of smaller rank point to root of larger rank
    if (rank[rootP] < rank[rootQ]) parent[rootP] = rootQ;
    else if (rank[rootP] > rank[rootQ]) parent[rootQ] = rootP;
    else {
      parent[rootQ] = rootP;
      rank[rootP] += 1;
    }
    c -= 1;
  };

  return Object.freeze({
    count,
    connected,
    union,
  });
};

module.exports = UnionFind;
