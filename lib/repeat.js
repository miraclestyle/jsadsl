const ds = () => {
  let capacity = 1;
  let queue = new Array(capacity).fill(null);
  let start = 0;
  let end = 0;
  let count = 0;

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity).fill(null);
    for (let i = 0; i < count; i += 1) {
      copy[i] = queue[(i + start) % capacity];
    }
    queue = copy;
    start = 0;
    end = count;
    capacity = newCapacity;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const enqueue = (item) => {
    if (capacity === count) resize(capacity * 2);
    queue[end] = item;
    end = (end + 1) % capacity;
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    const value = queue[start];
    queue[start] = null;
    start = (start + 1) % capacity;
    count -= 1;
    if (count > 0 && count * 4 <= capacity) resize(capacity / 2);
    return value;
  };

  const peek = () => (empty() ? null : queue[start]);

  const forEach = (callback) => {
    for (let i = 0; i < count; i += 1) {
      callback(queue[(i + start) % capacity]);
    }
  };

  const iterator = () => {
    let i = 0;

    const next = () => {
      const result = { done: false, value: null };
      if (i >= count) {
        result.done = true;
      } else {
        result.value = queue[(i + start) % capacity];
        i += 1;
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
