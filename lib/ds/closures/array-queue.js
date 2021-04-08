const ds = () => {
  let q = new Array(1).fill(null);
  let front = 0;
  let back = 0;
  let count = 0;

  const capacity = () => (q.length);

  const position = (index, n) => ((index + n) % capacity());

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity).fill(null);
    for (let i = 0; i < count; i += 1) {
      copy[i] = q[position(front, i)];
    }
    q = copy;
    front = 0;
    back = count;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const enqueue = (value) => {
    if (size() === capacity()) resize(capacity() * 2);
    q[back] = value;
    back = position(back, 1);
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    const value = q[front];
    q[front] = null;
    front = position(front, 1);
    count -= 1;
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
    return value;
  };

  const peek = () => (empty() ? null : q[front]);

  const forEach = (callback) => {
    for (let i = 0; i < count; i += 1) {
      callback(q[position(front, i)]);
    }
  };

  const iterator = () => {
    let i = 0;

    const next = () => {
      const result = { value: null, done: false };
      if (i === count) {
        result.done = true;
      } else {
        result.value = q[position(front, i)];
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
