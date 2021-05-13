/**
 * The {@code LinkedBag} class represents a bag (or multiset) of
 * generic items. It supports insertion and iterating over the
 * items in arbitrary order.
 * <p>
 * This implementation uses a singly linked list with a non-static nested class Node.
 * See {@link Bag} for a version that uses a static nested class.
 * The <em>add</em>, <em>isEmpty</em>, and <em>size</em> operations
 * take constant time. Iteration takes time proportional to the number of items.
 * <p>
 *
 * @author Elvin Kosova
 */
const LinkedBag = () => {
  let first = null;
  let n = 0;

  /**
   * Linked list node constructor.
   *
   * @param item the item to add to this bag
   * @param next the next node that links to this one
   * @return object referencing the item and next node
   */
  const Node = (item, next = null) => ({ item, next });

  /**
   * Is this bag empty?
   *
   * @return true if this bag is empty; false otherwise
   */
  const isEmpty = () => (first === null);

  /**
  * Returns the number of items in this bag.
  *
  * @return the number of items in this bag
  */
  const size = () => (n);

  /**
   * Adds the item to this bag.
   *
   * @param item the item to add to this bag
   */
  const add = (item) => {
    first = Node(item, first);
    n += 1;
  };

  /**
   * Iterates over the items in the bag in arbitrary order.
   *
   * @param callback the callback that is invoked for each bag item
   */
  const forEach = (callback) => {
    let node = first;
    while (node !== null) {
      callback(node.item);
      node = node.next;
    }
  };

  return Object.freeze({
    isEmpty,
    size,
    add,
    forEach,
  });
};

module.exports = LinkedBag;
