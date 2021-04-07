const stack = () => {
  let root = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

  const size = () => (count);

  const empty = () => (count === 0);

  const push = (item) => {
    root = Node(item, root);
    count += 1;
  };

  const peek = () => (count > 0 ? root.value : null);

  const pop = () => {
    if (count === 0) return null;
    const { value } = root;
    root = root.next;
    count -= 1;
    return value;
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

  const forEach = (callback) => {
    let node = root;
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  return {
    size,
    empty,
    push,
    peek,
    pop,
    forEach,
    [Symbol.iterator]: iterator,
  };
};

module.exports = stack;
