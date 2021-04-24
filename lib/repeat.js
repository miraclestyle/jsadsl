const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const ds = (compare = defaultCompare) => {
  let root = null;

  const Node = (key, value, count = 1, left = null, right = null) => (
    {
      key,
      value,
      count,
      left,
      right,
    }
  );

  const nodeSize = (node) => (node === null ? 0 : node.count);

  const nodePut = (key, value, node) => {
    if (node === null) return Node(key, value);
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = nodePut(key, value, node.left);
    else if (cmp > 0) node.right = nodePut(key, value, node.right);
    else node.value = value;
    node.count = 1 + nodeSize(node.left) + nodeSize(node.right);
    return node;
  };

  const nodeGet = (key, node) => {
    while (node !== null) {
      const cmp = compare(key, node.key);
      if (cmp < 0) node = node.left;
      else if (cmp > 0) node = node.right;
      else break;
    }
    return node;
  };

  const nodeRank = (key, node) => {
    if (node === null) return 0;
    const cmp = compare(key, node.key);
    if (cmp < 0) return nodeRank(key, node.left);
    if (cmp > 0) return 1 + nodeSize(node.left) + nodeRank(key, node.right);
    if (cmp === 0) return nodeSize(node.left);
  };

  const nodeForEach = (callback, node) => {
    if (node === null) return;
    nodeForEach(callback, node.left);
    callback(node.key, node.value);
    nodeForEach(callback, node.right);
  };

  const nodeRangeSearch = (callback, low, high, node) => {
    if (node === null) return;
    const cmpLow = compare(low, node.key);
    const cmpHigh = compare(high, node.key);
    if (cmpLow < 0) nodeRangeSearch(callback, low, high, node.left);
    if (cmpLow <= 0 && cmpHigh >= 0) callback(node.key, node.value);
    if (cmpHigh > 0) nodeRangeSearch(callback, low, high, node.right);
  };

  const size = () => (nodeSize(root));

  const put = (key, value) => {
    root = nodePut(key, value, root);
  };

  const rank = (key) => (nodeRank(key, root));

  const get = (key) => {
    const node = nodeGet(key, root);
    return node === null ? null : node.value;
  };

  const contains = (key) => (get(key) !== null);

  const forEach = (callback) => {
    nodeForEach(callback, root);
  };

  const rangeSearch = (callback, low, high) => {
    nodeRangeSearch(callback, low, high, root);
  };

  const rangeCount = (low, high) => {
    if (contains(high)) return rank(high) - rank(low) + 1;
    return rank(high) - rank(low);
  };

  return Object.freeze({
    size,
    put,
    get,
    forEach,
    rangeCount,
    rangeSearch,
  });
};

module.exports = ds;

const random = ['S', 'E', 'X', 'A', 'R', 'U', 'C', 'H', 'M', 'L', 'P'];
const sorted = ['A', 'C', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'U', 'X'];
const bst = ds();

random.forEach((e, i) => {
  bst.put(e, e);
});
let j = 0;
bst.forEach((k, v) => {
  if (k !== sorted[j]) console.log('mismatch:', k, sorted[j], j);
  j += 1;
});

const expectedTight = ['E', 'H', 'L', 'M', 'P', 'R', 'S'];
const expectedLoose = ['H', 'L', 'M', 'P', 'R', 'S'];
let range = [];
bst.rangeSearch((k, v) => range.push(k), 'E', 'S');
range.forEach((e, i) => {
  if (e !== expectedTight[i]) console.log('mismatch:', e, expectedTight[i], i);
});
range = [];
bst.rangeSearch((k, v) => range.push(k), 'F', 'T');
range.forEach((e, i) => {
  if (e !== expectedLoose[i]) console.log('mismatch:', e, expectedLoose[i], i);
});
console.log(bst.rangeCount('E', 'S'), 7);
console.log('======');
console.log(bst.rangeCount('E', 'T'), 7);
console.log('======');
bst.rangeSearch(console.log, 'E', 'S');
console.log('======');
bst.rangeSearch(console.log, 'F', 'T');
console.log('======');
bst.forEach(console.log);
console.log('======');
