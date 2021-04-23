const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const ds = (compare = defaultCompare) => {
  let limit = 1;
  let pq = new Array(limit).fill(null);
  let count = 0;

  const less = (a, b) => (compare(pq[a], pq[b]) < 0);

  const swap = (i, j) => {
    [pq[i], pq[j]] = [pq[j], pq[i]];
  };

  const capacity = () => (limit);

  const size = () => (count);

  const empty = () => (count === 0);

  const resize = (newLimit) => {
    const copy = new Array(newLimit).fill(null);
    for (let i = 0; i < size(); i += 1) {
      copy[i] = pq[i];
    }
    pq = copy;
    limit = newLimit;
  };

  const swim = (index) => {
    let child = index;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0) {
      if (less(parent, child)) break;
      swap(parent, child);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  };

  const sink = (index) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (child < size()) {
      if (child + 1 < size() && less(child + 1, child)) child += 1;
      if (less(parent, child)) break;
      swap(parent, child);
      parent = child;
      child = parent * 2 + 1;
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
    swap(0, size());
    const value = pq[size()];
    pq[size()] = null;
    sink(0);
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
    return value;
  };

  const peek = () => (empty() ? null : pq[0]);

  return Object.freeze({
    size,
    empty,
    insert,
    extract,
    peek,
  });
};

module.exports = ds;
