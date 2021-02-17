const ds = () => {
  let stack = new Array(1).fill(null);
  let count = 0;

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity);
    for (let i = 0; i < count; i += 1) {
      copy[i] = stack[i];
    }
    stack = copy;
  };

  const capacity = () => (stack.length);

  const size = () => (count);

  const empty = () => (count === 0);

  const push = (value) => {
    if (size() === capacity()) resize(capacity() * 2);
    stack[count] = value;
    count += 1;
  };

  const pop = () => {
    if (empty()) return null;
    count -= 1;
    const value = stack[count];
    stack[count] = null;
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
    return value;
  };

  const peek = () => (empty() ? null : stack[count - 1]);

  const forEach = (callback) => {
    for (let i = count - 1; i >= 0; i -= 1) {
      callback(stack[i]);
    }
  };

  const iterator = () => {
    let index = count - 1;

    const next = () => {
      const result = { value: null, done: false };
      if (index < 0) {
        result.done = true;
      } else {
        result.value = stack[index];
        index -= 1;
      }
      return result;
    };

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

module.exports = ds;
