/**
 * The {@code ResizingArrayStack} class represents a last-in-first-out (LIFO) stack
 * of generic items.
 * It supports the usual <em>push</em> and <em>pop</em> operations, along with methods
 * for peeking at the top item, testing if the stack is empty, and iterating through
 * the items in LIFO order.
 * <p>
 * This implementation uses a resizing array, which double the underlying array
 * when it is full and halves the underlying array when it is one-quarter full.
 * The <em>push</em> and <em>pop</em> operations take constant amortized time.
 * The <em>size</em>, <em>peek</em>, and <em>is-empty</em> operations takes
 * constant time in the worst case.
 * <p>
 *
 * @author Elvin Kosova
 */
const ResizingArrayStack = () => {
  // initial capacity of underlying resizing array
  const INIT_CAPACITY = 8;
  let stack = new Array(INIT_CAPACITY).fill(null);
  let n = 0;

  /**
   * Is this stack empty?
   *
   * @return true if this stack is empty; false otherwise
   */
  const isEmpty = () => (n === 0);

  /**
   * Returns the number of items in the stack.
   *
   * @return the number of items in the stack
   */
  const size = () => (n);

  /**
   * Resize the underlying array holding the elements.
   *
   * @param capacity the new capacity of the underlying array
   */
  const resize = (capacity) => {
    if (capacity < n) throw new Error('Capacity is less than the number of items on the stack!');
    const copy = new Array(capacity).fill(null);
    for (let i = 0; i < n; i += 1) {
      copy[i] = stack[i];
    }
    stack = copy;
  };

  /**
   * Adds the item to this stack.
   *
   * @param item the item to add
   */
  const push = (item) => {
    if (n === stack.length) resize(2 * stack.length);
    stack[n] = item;
    n += 1;
  };

  /**
   * Removes and returns the item most recently added to this stack.
   *
   * @return the item most recently added
   * @throws error if this stack is empty
   */
  const pop = () => {
    if (isEmpty()) throw new Error('Stack underflow!');
    n -= 1;
    const item = stack[n];
    stack[n] = null;
    if (n > 0 && n <= stack.length / 4) resize(stack.length / 2);
    return item;
  };

  /**
   * Returns (but does not remove) the item most recently
   * added to this stack.
   *
   * @return the item most recently added to this stack
   * @throws error if this stack is empty
   */
  const peek = () => {
    if (isEmpty()) throw new Error('Stack underflow!');
    return stack[n - 1];
  };

  /**
   * Returns an iterator to this stack that iterates
   * through the items in LIFO order.
   *
   * @param callback the callback that is invoked for each stack item
   * in LIFO order.
   */
  const forEach = (callback) => {
    for (let i = n - 1; i >= 0; i -= 1) {
      callback(stack[i]);
    }
  };

  return Object.freeze({
    isEmpty,
    size,
    push,
    pop,
    peek,
    forEach,
  });
};

module.exports = ResizingArrayStack;
