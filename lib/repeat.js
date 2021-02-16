const stack = () => {
  let root = null;
  let count = 0;
  let position = null;

  const Node = (value, next = null) => ({ value, next });

  const size = () => (count);

  const empty = () => (count === 0);

  const push = (value) => {
    root = Node(value, root);
    count += 1;
  };

  const pop = () => {
    if (empty()) return null;
    const { value } = root;
    root = root.next;
    count -= 1;
    return value;
  };

  const peek = () => {
    if (empty()) return null;
    return root.value;
  };

  const forEach = (callback) => {
    let node = root;
    while (node !== null) {
      callback(node.value);
      node = node.next;
    }
  };

  const next = () => {
    const result = { value: null, done: false };
    if (position === null) {
      result.done = true;
    } else {
      result.value = position.value;
      position = position.next;
    }
    return result;
  };

  const iterator = () => {
    position = root;
    return { next };
  };

  return {
    size,
    empty,
    push,
    pop,
    peek,
    forEach,
    [Symbol.iterator]: iterator,
  };
};

module.exports = stack;
