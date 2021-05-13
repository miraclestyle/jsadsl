/**
 * The {@code LinkedQueue} class represents a first-in-first-out (FIFO)
 * queue of generic items.
 * It supports the usual <em>enqueue</em> and <em>dequeue</em>
 * operations, along with methods for peeking at the first item,
 * testing if the queue is empty, and iterating through
 * the items in FIFO order.
 * <p>
 * This implementation uses a singly linked list with a non-static nested class
 * for linked-list nodes.  See {@link Queue} for a version that uses a static nested class.
 * The <em>enqueue</em>, <em>dequeue</em>, <em>peek</em>, <em>size</em>, and <em>is-empty</em>
 * operations all take constant time in the worst case.
 * <p>
 *
 * @author Elvin Kosova
 */
const LinkedQueue = () => {
  let n = 0; // number of elements on queue
  let first = null; // beginning of queue
  let last = null; // end of queue

  /**
   * Queue consistency validator.
   *
   * @return true if the queue is valid; false otherwise
   */
  const check = () => {
    if (n < 0) {
      return false;
    }
    if (n === 0) {
      if (first !== null) return false;
      if (last !== null) return false;
    } else if (n === 1) {
      if (first === null || last === null) return false;
      if (first !== last) return false;
      if (first.next !== null) return false;
    } else {
      if (first === null || last === null) return false;
      if (first === last) return false;
      if (first.next === null) return false;
      if (last.next !== null) return false;
      // check internal consistency of instance variable n
      let numberOfNodes = 0;
      for (let x = first; x !== null && numberOfNodes <= n; x = x.next) {
        numberOfNodes += 1;
      }
      if (numberOfNodes !== n) return false;
      // check internal consistency of instance variable last
      let lastNode = first;
      while (lastNode.next !== null) {
        lastNode = lastNode.next;
      }
      if (last !== lastNode) return false;
    }
    return true;
  };

  /**
   * Queue consistency assertion.
   *
   * @throws an Error if this queue is invalid
   */
  const assertCheck = () => {
    if (!check()) throw new Error('Queue check error!');
  };

  assertCheck();

  /**
   * Node instance constructor.
   *
   * @return Node instance
   */
  const Node = (item, next = null) => ({ item, next });

  /**
   * Is this queue empty?
   *
   * @return true if this queue is empty; false otherwise
   */
  const isEmpty = () => (first === null);

  /**
   * Returns the number of items in this queue.
   *
   * @return the number of items in this queue
   */
  const size = () => (n);

  /**
   * Returns the item least recently added to this queue.
   *
   * @return the item least recently added to this queue
   * @throws an Error if this queue is empty
   */
  const peek = () => {
    if (isEmpty()) throw new Error('Queue underflow!');
    return first.item;
  };

  /**
  * Adds the item to this queue.
  *
  * @param item the item to add
  */
  const enqueue = (item) => {
    const oldlast = last;
    last = Node(item);
    if (isEmpty()) first = last;
    else oldlast.next = last;
    n += 1;
    assertCheck();
  };

  /**
   * Removes and returns the item on this queue that was least recently added.
   *
   * @return the item on this queue that was least recently added
   * @throws an Error if this queue is empty
   */
  const dequeue = () => {
    if (isEmpty()) throw new Error('Queue underflow!');
    const { item } = first;
    first = first.next;
    n -= 1;
    if (isEmpty()) last = null; // to avoid loitering
    assertCheck();
    return item;
  };

  /**
   * Returns a string representation of this queue.
   *
   * @return the sequence of items in FIFO order, separated by spaces
   */
  const toString = () => {
    const s = [];
    let node = first;
    while (node !== null) {
      s.push(node.item);
      node = node.next;
    }
    return s.join(' ');
  };

  return Object.freeze({
    isEmpty,
    size,
    peek,
    enqueue,
    dequeue,
    toString,
  });
};

module.exports = LinkedQueue;
