const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const ds = (compare = defaultCompare) => {
  let space = 1;
  let pq = new Array(space).fill(null);
  let count = 0;

  const capacity = () => (space);

  const size = () => (count);

  const empty = () => (count === 0);

  const resize = (newSpace) => {
    const copy = new Array(newSpace).fill(null);
    for (let i = 0; i < size(); i += 1) {
      copy[i] = pq[i];
    }
    pq = copy;
    space = newSpace;
  };

  const less = (a, b) => (compare(pq[a], pq[b]) < 0);

  const swap = (i, j) => {
    const temp = pq[i];
    pq[i] = pq[j];
    pq[j] = temp;
  };

  const sink = (i) => {
    let parent = i;
    let child = parent * 2 + 1;
    while (child < size()) {
      if (child + 1 < size() && less(child + 1, child)) child += 1;
      if (less(parent, child)) break;
      swap(parent, child);
      parent = child;
      child = parent * 2 + 1;
    }
  };

  const swim = (i) => {
    let child = i;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0) {
      if (less(parent, child)) break;
      swap(parent, child);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  };

  const insert = (item) => {
    if (size() === capacity()) resize(capacity() * 2);
    pq[size()] = item;
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

  const peek = () => (pq[0]);

  return Object.freeze({
    size,
    empty,
    insert,
    extract,
    peek,
  });
};

module.exports = ds;
