const ds = () => {
  let root = null;
  let count = 0;

  const Node = (value = null, next = null) => ({ value, next });

  const empty = () => (root === null);

  const size = () => (count);

  const push = (value) => {
    count += 1;
    if (empty()) {
      root = Node(value);
      return;
    }
    const old = root;
    root = Node(value, old);
  };

  const pop = () => {
    if (empty()) return null;
    const { value } = root;
    root = root.next;
    count -= 1;
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
    empty,
    size,
    push,
    pop,
    peek,
    forEach,
    [Symbol.iterator]: iterator,
  };
};

module.exports = ds;
