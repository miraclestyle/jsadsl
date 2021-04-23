const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const ds = (compare = defaultCompare) => {
  let limit = 1;
  let pq = new Array(limit).fill(null);
  let count = 0;

  const size = () => (count);

  const empty = () => (count === 0);

  const capacity = () => (limit);

  const less = (a, b) => (compare(pq[a], pq[b]) < 0);

  const swap = (i, j) => {
    [pq[i], pq[j]] = [pq[j], pq[i]];
  };

  const resize = (newLimit) => {
    const copy = new Array(newLimit).fill(null);
    for (let i = 0; i < size(); i += 1) {
      copy[i] = pq[i];
    }
    pq = copy;
    limit = newLimit;
  };

  const sink = (index) => {
    let parent = index; // 0
    let child = parent * 2 + 1; // 0 * 2 + 1 = 1
    while (child < size()) {
      if (child + 1 < size() && less(child + 1, child)) {
        child += 1; // 2
      }
      if (less(parent, child)) break;
      swap(parent, child);
      parent = child; // 1 : 2
      child = parent * 2 + 1; // 3 : 5
    }
  };

  const swim = (index) => {
    let child = index; // 4
    let parent = Math.floor((child - 1) / 2); // [(4 - 1) / 2] = 1
    while (parent >= 0) {
      if (less(parent, child)) break;
      swap(parent, child);
      child = parent; // 1
      parent = Math.floor((child - 1) / 2); // 0
    }
  };

  const insert = (value) => {
    if (size() === capacity()) resize(capacity() * 2);
    pq[size()] = value;
    swim(size());
    count += 1;
  };

  const extract = () => {
    if (empty()) return null;
    count -= 1;
    const value = pq[0];
    swap(0, size());
    pq[size()] = null;
    sink(0);
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
    return value;
  };

  const peek = () => (empty() ? null : pq[0]);

  return Object.freeze({
    size,
    empty,
    sink,
    swim,
    insert,
    extract,
    peek,
  });
};

module.exports = ds;
