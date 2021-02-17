const ds = () => {
  let head = null;
  let tail = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

  const size = () => (count);

  const empty = () => (count === 0);

  const enqueue = (value) => {
    if (empty()) {
      head = Node(value);
      tail = head;
    } else {
      tail.next = Node(value);
      tail = tail.next;
    }
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    const { value } = head;
    head = head.next;
    if (head === null) {
      tail = null;
    }
    count -= 1;
    return value;
  };

  const peek = () => (empty() ? null : head.value);

  const forEach = (callback) => {
    let node = head;
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  const iterator = () => {
    let node = head;

    const next = () => {
      const result = { value: null, done: false };
      if (node === null) {
        result.done = true;
      } else {
        result.value = node.value;
        node = node.next;
      }
      return result;
    };

    return { next };
  };

  return {
    size,
    empty,
    enqueue,
    dequeue,
    peek,
    forEach,
    [Symbol.iterator]: iterator,
  };
};

module.exports = ds;
