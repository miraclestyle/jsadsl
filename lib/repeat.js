const ds = (compare) => {
  let pq = new Array(1).fill(null);
  let count = 0;

  const capacity = () => (pq.length);

  const resize = (newCapacity) => {
    const copy = new Array(newCapacity).fill(null);
    for (let i = 0; i < count; i += 1) {
      copy[i] = pq[i];
    }
    pq = copy;
  };

  const swap = (i, j) => {
    [pq[i], pq[j]] = [pq[j], pq[i]];
  };

  const defaultCompare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const lessInit = () => {
    const cmp = typeof compare === 'function' ? compare : defaultCompare;
    return (i, j) => (cmp(pq[i], pq[j]) < 0);
  };

  const less = lessInit();

  const sink = (index) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (child < count) {
      if (child + 1 < count && less(child, child + 1)) child += 1;
      if (less(child, parent)) break;
      swap(child, parent);
      parent = child;
      child = parent * 2 + 1;
    }
  };

  const swim = (index) => {
    let child = index;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0) {
      if (less(child, parent)) break;
      swap(child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const insert = (value) => {
    if (size() === capacity()) resize(capacity() * 2);
    pq[count] = value;
    swim(count);
    count += 1;
  };

  const extract = () => {
    if (empty()) return null;
    count -= 1;
    swap(0, count);
    const value = pq[count];
    pq[count] = null;
    sink(0);
    if (size() > 0 && size() * 4 <= capacity()) resize(capacity() / 2);
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
