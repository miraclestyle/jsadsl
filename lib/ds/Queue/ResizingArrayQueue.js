/**
 * The {@code ResizingArrayQueue} class represents a first-in-first-out (FIFO)
 * queue of generic items.
 * It supports the usual <em>enqueue</em> and <em>dequeue</em>
 * operations, along with methods for peeking at the first item,
 * testing if the queue is empty, and iterating through
 * the items in FIFO order.
 * <p>
 * This implementation uses a resizing array, which double the underlying array
 * when it is full and halves the underlying array when it is one-quarter full.
 * The <em>enqueue</em> and <em>dequeue</em> operations take constant amortized time.
 * The <em>size</em>, <em>peek</em>, and <em>is-empty</em> operations takes
 * constant time in the worst case.
 * <p>
 *
 * @author Elvin Kosova
 */
const ResizingArrayQueue = () => {
  // initial capacity of underlying resizing array
  const INIT_CAPACITY = 8;
  let q = new Array(INIT_CAPACITY).fill(null); // queue elements
  let n = 0; // number of elements on queue
  let first = 0; // index of first element of queue
  let last = 0; // index of next available slot

  /**
   * Is this queue empty?
   *
   * @return true if this queue is empty; false otherwise
   */
  const isEmpty = () => (n === 0);

  /**
   * Returns the number of items in this queue.
   *
   * @return the number of items in this queue
   */
  const size = () => (n);

  /**
   * Resize the underlying array.
   *
   * @param capacity the new capacity of the queue array
   */
  const resize = (capacity) => {
    if (capacity <= n) throw new Error('Invalid capacity specified!');
    const copy = new Array(capacity).fill(null);
    for (let i = 0; i < n; i += 1) {
      copy[i] = q[(first + i) % q.length];
    }
    q = copy;
    first = 0;
    last = n;
  };

  /**
   * Adds the item to this queue.
   *
   * @param item the item to add
   */
  const enqueue = (item) => {
    // double size of array if necessary and recopy to front of array
    if (n === q.length) resize(2 * q.length);
    q[last] = item; // add item
    last = (last + 1) % q.length; // wrap-around
    n += 1;
  };

  /**
   * Removes and returns the item on this queue that was least recently added.
   *
   * @return the item on this queue that was least recently added
   * @throws an Error if this queue is empty
   */
  const dequeue = () => {
    if (isEmpty()) throw new Error('Queue underflow!');
    const item = q[first];
    q[first] = null; // to avoid loitering
    n -= 1;
    first = (first + 1) % q.length; // wrap-around
    // shrink size of array if necessary
    if (n > 0 && n === q.length / 4) resize(q.length / 2);
    return item;
  };

  /**
  * Returns the item least recently added to this queue.
  *
  * @return the item least recently added to this queue
  * @throws an Error if this queue is empty
  */
  const peek = () => {
    if (isEmpty()) throw new Error('Queue underflow!');
    return q[first];
  };

  return Object.freeze({
    isEmpty,
    size,
    enqueue,
    dequeue,
    peek,
  });
};

module.exports = ResizingArrayQueue;
