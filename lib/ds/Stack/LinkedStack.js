/**
 * The {@code LinkedStack} class represents a last-in-first-out (LIFO) stack of
 * generic items.
 * It supports the usual <em>push</em> and <em>pop</em> operations, along with methods
 * for peeking at the top item, testing if the stack is empty, and iterating through
 * the items in LIFO order.
 * <p>
 * This implementation uses a singly linked list with a non-static nested class for
 * linked-list nodes. See {@link Stack} for a version that uses a static nested class.
 * The <em>push</em>, <em>pop</em>, <em>peek</em>, <em>size</em>, and <em>is-empty</em>
 * operations all take constant time in the worst case.
 * <p>
 *
 * @author Elvin Kosova
 */
const LinkedStack = () => {
  let first = null;
  let n = 0;

  /**
   * Check internal invariants
   *
   * @return true if internal structure is in order; false otherwise
   */
  const check = () => {
    if (n < 0) {
      return false;
    }
    if (n === 0) {
      if (first !== null) return false;
    } else if (n === 1) {
      if (first === null) return false;
      if (first.next !== null) return false;
    } else {
      if (first === null) return false;
      if (first.next === null) return false;
    }
    let numberOfNodes = 0;
    for (let x = first; x !== null && numberOfNodes <= n; x = x.next) {
      numberOfNodes += 1;
    }
    if (numberOfNodes !== n) return false;
    return true;
  };

  if (!check()) throw new Error('Check failed!');

  /**
   * Linked list node constructor.
   *
   * @param item the item to add to this stack
   * @param next the next node that links to this one
   * @return object referencing the item and next node
   */
  const Node = (item, next = null) => ({ item, next });

  /**
   * Is this stack empty?
   *
   * @return true if this stack is empty; false otherwise
   */
  const isEmpty = () => (first === null);

  /**
   * Returns the number of items in the stack.
   *
   * @return the number of items in the stack
   */
  const size = () => (n);

  /**
   * Adds the item to this stack.
   *
   * @param item the item to add
   */
  const push = (item) => {
    first = Node(item, first);
    n += 1;
    if (!check()) throw new Error('Check failed!');
  };

  /**
   * Removes and returns the item most recently added to this stack.
   *
   * @return the item most recently added
   * @throws error if this stack is empty
   */
  const pop = () => {
    if (isEmpty()) throw new Error('Stack underflow!');
    const { item } = first;
    first = first.next;
    n -= 1;
    if (!check()) throw new Error('Check failed!');
    return item;
  };

  /**
   * Returns (but does not remove) the item most recently added to this stack.
   *
   * @return the item most recently added to this stack
   * @throws error if this stack is empty
   */
  const peek = () => {
    if (isEmpty()) throw new Error('Stack underflow!');
    return first.item;
  };

  /**
   * Iterate through the items in LIFO order.
   *
   * @param callback the callback that is invoked for each stack item
   * in LIFO order.
   */
  const forEach = (callback) => {
    let node = first;
    while (node !== null) {
      callback(node.item);
      node = node.next;
    }
  };

  /**
   * Returns a string representation of this stack.
   *
   * @return the sequence of items in the stack in LIFO order,
   * separated by spaces
   */
  const toString = () => {
    const s = [];
    forEach((item) => {
      s.push(item);
    });
    return s.join(' ');
  };

  return Object.freeze({
    isEmpty,
    size,
    push,
    pop,
    peek,
    forEach,
    toString,
  });
};

module.exports = LinkedStack;
