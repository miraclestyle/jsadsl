const ds = () => {
  let root = null;
  let leaf = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

  const size = () => (count);

  const empty = () => (count === 0);

  const enqueue = (item) => {
    if (empty()) {
      const node = Node(item);
      root = node;
      leaf = node;
    } else {
      leaf.next = Node(item);
      leaf = leaf.next;
    }
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    count -= 1;
    const { value } = root;
    root = root.next;
    if (empty()) leaf = null;
    return value;
  };

  const peek = () => (empty() ? null : root.value);

  const forEach = (callback) => {
    let node = root;
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  const iterator = () => {
    let node = root;

    const next = () => {
      const result = { done: false, value: null };
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
