const { getType, defaultCompare } = require('../../util');

const ds = (n, compare) => {
  const values = new Array(n).fill(null);
  const pq = new Array(n).fill(null);
  const qp = new Array(n).fill(-1);
  let count = 0;

  const validateIndex = (index) => {
    if (index < 0 || index >= n) throw new Error('Index out of range!');
  };

  const cmp = getType(compare) === 'function' ? compare : defaultCompare;

  const less = (i, j) => (cmp(values[pq[i]], values[pq[j]]) < 0);

  const swap = (i, j) => {
    const temp = pq[i];
    pq[i] = pq[j];
    pq[j] = temp;
    qp[pq[i]] = i;
    qp[pq[j]] = j;
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const contains = (index) => {
    validateIndex(index);
    return qp[index] !== -1;
  };

  const swim = (index) => {
    let child = index;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0) {
      if (less(child, parent)) break;
      swap(parent, child); // ? swap(child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
  };

  const sink = (index) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (child < count) {
      if (child + 1 < count && less(child, child + 1)) {
        child += 1;
      }
      if (less(child, parent)) break;
      swap(parent, child);
      parent = child;
      child = parent * 2 + 1;
    }
  };

  const insert = (index, value) => {
    validateIndex(index);
    if (contains(index)) throw new Error('Index is already in the priority queue!');
    qp[index] = count;
    pq[count] = index;
    values[index] = value;
    swim(count);
    count += 1;
  };

  const update = (index, value) => {
    validateIndex(index);
    if (!contains(index)) throw new Error('Index is not in the priority queue!');
    values[index] = value;
    swim(qp[index]);
    sink(qp[index]);
  };

  const remove = (index) => {
    validateIndex(index);
    if (!contains(index)) throw new Error('Index is not in the priority queue!');
    const i = qp[index];
    count -= 1;
    swap(i, count);
    swim(i);
    sink(i);
    values[index] = null;
    qp[index] = -1;
  };

  const extract = () => {
    if (empty()) return null;
    const value = pq[0];
    count -= 1;
    swap(0, count);
    pq[count] = -1;
    qp[value] = -1;
    values[value] = null;
    sink(0);
    return value;
  };

  const peekIndex = () => (empty() ? null : pq[0]);

  const peekValue = () => (empty() ? null : values[pq[0]]);

  const valueOf = (index) => {
    validateIndex(index);
    if (!contains(index)) return null;
    return values[index];
  };

  const inspect = () => {
    const fix = (e) => ((e === null || e === -1) ? '#' : e);
    console.log('=======================');
    console.log(Array.from(new Array(n), (e, i) => (i)).join(', '));
    console.log(values.map(fix).join(', '));
    console.log(pq.map(fix).join(', '));
    console.log(qp.map(fix).join(', '));
    console.log('=======================');
  };

  return {
    size,
    empty,
    contains,
    insert,
    update,
    remove,
    extract,
    peekIndex,
    peekValue,
    valueOf,
    inspect,
  };
};

module.exports = ds;

// const ipq = ds(8, (a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
//   return 0;
// });

// ipq.insert(0, 'A');
// ipq.insert(1, 'S');
// ipq.insert(2, 'O');
// ipq.insert(3, 'R');
// ipq.insert(4, 'T');
// ipq.insert(5, 'I');
// ipq.insert(6, 'N');
// ipq.insert(7, 'G');

// ipq.inspect();

// console.log(ipq.peekValue(), ':', ipq.peekIndex());
// console.log(ipq.contains(0));
// console.log(ipq.extract());
// console.log(ipq.contains(0));

// ipq.inspect();

// console.log(ipq.peekValue(), ':', ipq.peekIndex());
// console.log(ipq.contains(7));
// console.log(ipq.extract());
// console.log(ipq.contains(7));

// ipq.inspect();

// console.log(ipq.peekValue(), ':', ipq.peekIndex());
// console.log(ipq.contains(5));
// console.log(ipq.extract());
// console.log(ipq.contains(5));

// ipq.inspect();
