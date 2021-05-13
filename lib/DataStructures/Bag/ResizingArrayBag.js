/**
 * The {@code ResizingArrayBag} class represents a bag (or multiset) of
 * generic items. It supports insertion and iterating over the
 * items in arbitrary order.
 * <p>
 * This implementation uses a resizing array.
 * See {@link LinkedBag} for a version that uses a singly linked list.
 * The <em>add</em> operation takes constant amortized time; the
 * <em>isEmpty</em>, and <em>size</em> operations
 * take constant time. Iteration takes time proportional to the number of items.
 * <p>
 *
 * @author Elvin Kosova
 */
const ResizingArrayBag = () => {
  const INIT_CAPACITY = 8;
  let bag = new Array(INIT_CAPACITY).fill(null);
  let n = 0;

  /**
   * Is this bag empty?
   *
   * @return true if this bag is empty; false otherwise
   */
  const isEmpty = () => (n === 0);

  /**
   * Returns the number of items in this bag.
   *
   * @return the number of items in this bag
   */
  const size = () => (n);

  /**
   * Resize the underlying array holding the elements.
   *
   * @param capacity the new capacity of the underlying array
   */
  const resize = (capacity) => {
    if (capacity < n) throw new Error('Capacity is less than the number of items in the bag!');
    const copy = new Array(capacity).fill(null);
    for (let i = 0; i < n; i += 1) {
      copy[i] = bag[i];
    }
    bag = copy;
  };

  /**
   * Adds the item to this bag.
   *
   * @param item the item to add to this bag
   */
  const add = (item) => {
    if (n === bag.length) resize(2 * bag.length);
    bag[n] = item;
    n += 1;
  };

  /**
   * Iterates over the items in the bag in arbitrary order.
   *
   * @param callback the callback that is invoked for each bag item
   */
  const forEach = (callback) => {
    for (let i = 0; i < n; i += 1) {
      callback(bag[i]);
    }
  };

  return Object.freeze({
    isEmpty,
    size,
    add,
    forEach,
  });
};

module.exports = ResizingArrayBag;
