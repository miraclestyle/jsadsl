const ds = () => {
  let stack = new Array(1).fill(null);
  let count = 0;
  let capacity = 1;

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity).fill(null);
    for (let i = 0; i < count; i += 1) {
      copy[i] = stack[i];
    }
    stack = copy;
    capacity = newCapacity;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const push = (item) => {
    if (capacity === count) resize(capacity * 2);
    stack[count] = item;
    count += 1;
  };

  const peek = () => (empty() ? null : stack[count - 1]);

  const pop = () => {
    if (empty()) return null;
    count -= 1;
    const value = stack[count];
    stack[count] = null;
    if (count > 0 && capacity >= count * 4) resize(capacity / 2);
    return value;
  };

  const iterator = () => {
    let index = count - 1;

    const next = () => {
      const result = { done: false, value: null };
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

  const forEach = (callback) => {
    for (let i = count - 1; i >= 0; i -= 1) {
      callback(stack[i]);
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

module.exports = ds;
