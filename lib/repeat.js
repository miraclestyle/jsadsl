const ds = () => {
  let root = null;

  const Node = (key, value, count = 0, left = null, right = null) => (
    {
      key,
      value,
      left,
      right,
      count,
    }
  );

  const sizeNode = (node) => {
    if (node === null) return 0;
    return node.count;
  };

  const putNode = (node, key, value) => {
    if (node === null) return Node(key, value, 1);
    if (key < node.key) node.left = putNode(node.left, key, value);
    else if (key > node.key) node.right = putNode(node.right, key, value);
    else node.value = value;
    node.count = sizeNode(node.left) + sizeNode(node.right) + 1;
    return node;
  };

  const getNode = (node, key) => {
    while (node !== null) {
      if (key < node.key) node = node.left;
      else if (key > node.key) node = node.right;
      else break;
    }
    return node;
  };

  const traverseNode = (callback, node) => {
    if (node === null) return;
    traverseNode(callback, node.left);
    callback(node.key, node.value);
    traverseNode(callback, node.right);
  };

  const rangeNodeSearch = (callback, low, high, node) => {
    if (node === null) return;
    if (low < node.key) rangeNodeSearch(callback, low, high, node.left);
    if (low <= node.key && high >= node.key) callback(node.key, node.value);
    if (high > node.key) rangeNodeSearch(callback, low, high, node.right);
  };

  const size = () => (root === null ? 0 : root.count);

  const put = (key, value) => {
    root = putNode(root, key, value);
  };

  const get = (key) => {
    const node = getNode(root, key);
    return node === null ? null : node.value;
  };

  const traverse = (callback) => {
    traverseNode(callback, root);
  };

  const rangeSearch = (callback, low, high) => {
    rangeNodeSearch(callback, low, high, root);
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
    traverse,
    rangeSearch,
    rangeCount,
  });
};

module.exports = ds;

const tree = ds();
const input = ['S', 'E', 'X', 'A', 'R', 'U', 'C', 'H', 'M', 'L', 'P'];
input.forEach((item) => (tree.put(item, item)));
const expectedTight = ['E', 'H', 'L', 'M', 'P', 'R', 'S'];
const expectedLoose = ['H', 'L', 'M', 'P', 'R', 'S'];
let range = [];
tree.rangeSearch('E', 'S', (node) => range.push(node.key));
range.forEach((e, i) => {
  if (e !== expectedTight[i]) console.log(e, expectedTight[i]);
});
range = [];
tree.rangeSearch('F', 'T', (node) => range.push(node.key));
range.forEach((e, i) => {
  if (e !== expectedLoose[i]) console.log(e, expectedLoose[i]);
});
// console.log(tree.size());
tree.traverse(console.log);
console.log(tree.rangeCount('E', 'S'), 7);
console.log(tree.rangeCount('E', 'T'), 7);
// tree.rangeSearch(console.log, 3, 7);
// console.log('count:', tree.rangeCount(3, 7));
