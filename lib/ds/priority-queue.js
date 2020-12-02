const { swap, less } = require('../util');

const ds = (compare) => {
  const pq = [];
  let count = 0;

  const size = () => (count);

  const empty = () => (count === 0);

  const swim = (index) => {
    let child = index;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0) {
      if (less(pq[child], pq[parent], compare)) break;
      swap(pq, parent, child);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  };

  const sink = (index) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (child < count) {
      if (child + 1 < count && less(pq[child], pq[child + 1], compare)) {
        child += 1;
      }
      if (less(pq[child], pq[parent], compare)) break;
      swap(pq, parent, child);
      parent = child;
      child = parent * 2 + 1;
    }
  };

  const insert = (value) => {
    pq.push(value);
    swim(count);
    count += 1;
  };

  const extract = () => {
    if (empty()) return null;
    count -= 1;
    swap(pq, 0, count);
    const value = pq.pop();
    sink(0);
    return value;
  };

  const peek = () => (empty() ? null : pq[0]);

  return {
    size,
    empty,
    insert,
    extract,
    peek,
  };
};

module.exports = ds;
