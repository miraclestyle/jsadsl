const ds = () => {
  let length = 1;
  let count = 0;
  let head = 0;
  let tail = 0;
  let q = new Array(length).fill(null);

  const size = () => (count);

  const empty = () => (count === 0);

  const full = () => (count === length);

  const resize = (n) => {
    const copy = new Array(n).fill(null);
    for (let i = 0; i < count; i += 1) {
      copy[i] = q[(head + i) % length];
    }
    q = copy;
    length = n;
    head = 0;
    tail = count;
  };

  const enqueue = (value) => {
    if (full()) resize(length * 2);
    q[tail] = value;
    tail = (tail + 1) % length;
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    const value = q[head];
    q[head] = null;
    head = (head + 1) % length;
    count -= 1;
    if (count > 0 && count <= length / 4) resize(length / 2);
    return value;
  };

  const peek = () => (q[head]);

  const forEach = (callback) => {
    for (let i = head; i < count + head; i += 1) {
      const first = i === head;
      const last = i === count + head - 1;
      callback(q[i % length], first, last);
    }
  };

  const toString = () => {
    const out = [];
    forEach((value) => {
      out.push((value).toString());
    });
    return `[${out.join(', ')}]`;
  };

  return {
    size,
    empty,
    enqueue,
    dequeue,
    peek,
    forEach,
    toString,
  };
};

module.exports = ds;
