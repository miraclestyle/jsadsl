const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const ds = (compare = defaultCompare) => {
  const pq = [];

  const size = () => (pq.length);

  const empty = () => (pq.length === 0);

  const less = (a, b) => (compare(pq[a], pq[b]) < 0);

  const swap = (i, j) => {
    const temp = pq[i];
    pq[i] = pq[j];
    pq[j] = temp;
  };

  const sink = (i) => {
    const end = pq.length;
    let parent = i;
    let child = parent * 2 + 1;
    while (child < end) {
      if (child + 1 < end && less(child + 1, child)) child += 1;
      if (less(parent, child)) break;
      swap(parent, child);
      parent = child;
      child = parent * 2 + 1;
    }
  };

  const swim = (i) => {};

  const insert = (item) => {};

  const extract = () => {};

  const peek = () => (pq[0]);

  return {
    size,
    empty,
    insert,
    extract,
    peek,
  };
};

module.exports = ds;
