const ds = (n) => {
  const length = n;
  const q = new Array(length).fill(null);
  let count = 0;
  let head = 0;
  let tail = 0;

  const size = () => (count);

  const empty = () => (count === 0);

  const full = () => (count === length);

  const enqueue = (value) => {
    if (full()) return;
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
    return value;
  };

  const forEach = (callback) => {
    for (let i = head; i < count + head; i += 1) {
      const first = i === head;
      const last = i === count + head - 1;
      callback(q[i], first, last);
    }
  };

  const print = () => {
    let out = '[';
    forEach((value, first, last) => {
      out += (value).toString();
      out += last ? '' : ', ';
    });
    out += ']';
    return out;
  };

  return {
    size,
    empty,
    full,
    enqueue,
    dequeue,
    forEach,
    print,
  };
};

module.exports = ds;
