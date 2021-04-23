const ds = () => {
  let root = null;

  const Node = (key, value, count, left = null, right = null) => (
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
    if (node === null) return Node(key, value, 1);
    if (key < node.key) node.left = nodePut(key, value, node.left);
    else if (key > node.key) node.right = nodePut(key, value, node.right);
    else node.value = value;
    node.count = 1 + nodeSize(node.left) + nodeSize(node.right);
    return node;
  };

  const nodeGet = (key, node) => {
    while (node !== null) {
      if (key < node.key) node = node.left;
      else if (key > node.key) node = node.right;
      else break;
    }
    return node;
  };

  const nodeForEach = (callback, node) => {
    if (node === null) return;
    nodeForEach(callback, node.left);
    callback(node.key, node.value);
    nodeForEach(callback, node.right);
  };

  const nodeRangeSearch = (callback, low, high, node) => {
    if (node === null) return;
    if (low < node.key) nodeRangeSearch(callback, low, high, node.left);
    if (low <= node.key && high >= node.key) callback(node.key, node.value);
    if (high > node.key) nodeRangeSearch(callback, low, high, node.right);
  };

  const size = () => (nodeSize(root));

  const put = (key, value) => {
    root = nodePut(key, value, root);
  };

  const get = (key) => {
    const node = nodeGet(key, root);
    return node === null ? null : node.value;
  };

  const forEach = (callback) => {
    nodeForEach(callback, root);
  };

  const rangeSearch = (callback, low, high) => {
    nodeRangeSearch(callback, low, high, root);
  };

  const rangeCount = (low, high) => {
    let count = 0;
    rangeSearch(() => { count += 1; }, low, high);
    return count;
  };

  return Object.freeze({
    size,
    put,
    get,
    forEach,
    rangeSearch,
    rangeCount,
  });
};

module.exports = ds;

const source = ['S', 'E', 'X', 'A', 'R', 'U', 'C', 'H', 'M', 'L', 'P'];
const sorted = ['A', 'C', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'U', 'X'];
const tree = ds();
source.forEach((e) => {
  tree.put(e, e);
});
const expectedTight = ['E', 'H', 'L', 'M', 'P', 'R', 'S'];
const expectedLoose = ['H', 'L', 'M', 'P', 'R', 'S'];
let j = 0;
tree.forEach((k, v) => {
  if (k !== sorted[j]) console.log('mismatch:', k, sorted[j], j);
  j += 1;
});

let range = [];
tree.rangeSearch('E', 'S', (node) => range.push(node.key));
range.forEach((e, i) => {
  if (e !== expectedTight[i]) console.log('mismatch:', e, expectedTight[i], i);
});
range = [];
tree.rangeSearch('F', 'T', (node) => range.push(node.key));
range.forEach((e, i) => {
  if (e !== expectedLoose[i]) console.log('mismatch:', e, expectedLoose[i], i);
});
tree.forEach(console.log);
console.log('=============');
tree.rangeSearch(console.log, 'E', 'S');
console.log('=============');
tree.rangeSearch(console.log, 'F', 'T');
console.log('=============');
console.log(tree.rangeCount('E', 'S'), 7);
console.log('=============');
console.log(tree.rangeCount('E', 'T'), 7);
console.log('=============');
