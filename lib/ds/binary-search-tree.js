const { defaultCompare } = require('../util');

const ds = (compare = defaultCompare) => {
  let root = null;

  const Node = (key, value, count) => (
    {
      key,
      value,
      count,
      left: null,
      right: null,
    }
  );

  const sizeNode = (node) => (node === null ? 0 : node.count);

  const getNode = (key, node) => {
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp < 0) return getNode(key, node.left);
    if (cmp > 0) return getNode(key, node.right);
    return node;
  };

  const getKey = (node) => (node === null ? null : node.key);

  const getValue = (node) => (node === null ? null : node.value);

  const minNode = (node) => {
    if (node === null) return null;
    if (node.left === null) return node;
    return minNode(node.left);
  };

  const maxNode = (node) => {
    if (node === null) return null;
    if (node.right === null) return node;
    return maxNode(node.right);
  };

  const floorNode = (key, node) => { // Largest key <= given key
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp === 0) return node;
    if (cmp < 0) return floorNode(key, node.left);
    const temp = floorNode(key, node.right);
    if (temp !== null) return temp;
    return node;
  };

  const ceilingNode = (key, node) => { // Smallest key >= given key
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp === 0) return node;
    if (cmp > 0) return ceilingNode(key, node.right);
    const temp = ceilingNode(key, node.left);
    if (temp !== null) return temp;
    return node;
  };

  const rankNode = (key, node) => {
    if (node === null) return 0;
    const cmp = compare(key, node.key);
    if (cmp < 0) return rankNode(key, node.left);
    if (cmp > 0) return 1 + sizeNode(node.left) + rankNode(key, node.right);
    return sizeNode(node.left);
  };

  const selectNode = (k, node) => { // kth key
    if (node === null) return null;
    const t = sizeNode(node.left);
    if (t > k) return selectNode(k, node.left);
    if (t < k) return selectNode(k - t - 1, node.right);
    return node;
  };

  const resizeNode = (node) => {
    node.count = 1 + sizeNode(node.left) + sizeNode(node.right);
    return node;
  };

  const putNode = (key, value, node) => {
    if (node === null) return Node(key, value, 1);
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = putNode(key, value, node.left);
    else if (cmp > 0) node.right = putNode(key, value, node.right);
    else node.value = value;
    return resizeNode(node);
  };

  const removeMinNode = (node) => {
    if (node === null) return null;
    if (node.left === null) return node.right;
    node.left = removeMinNode(node.left);
    return resizeNode(node);
  };

  const removeMaxNode = (node) => {
    if (node === null) return null;
    if (node.right === null) return node.left;
    node.right = removeMaxNode(node.right);
    return resizeNode(node);
  };

  const removeNode = (key, node) => {
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = removeNode(key, node.left); // Search
    else if (cmp > 0) node.right = removeNode(key, node.right); // Search
    else {
      if (node.left === null) return node.right; // <= one child ? get it
      if (node.right === null) return node.left; // <= one child ? get it
      const temp = node;
      node = minNode(temp.right); // replace node with right min
      node.right = removeMinNode(temp.right); // delete right min
      node.left = temp.left;
    }
    return resizeNode(node);
  };

  const forEachNode = (callback, node) => {
    if (node === null) return null;
    forEachNode(callback, node.left);
    callback(node);
    forEachNode(callback, node.right);
    return null;
  };

  const size = () => (sizeNode(root));

  const get = (key) => (getValue(getNode(key, root)));

  const min = () => (getKey(minNode(root)));

  const max = () => (getKey(maxNode(root)));

  const floor = (key) => (getKey(floorNode(key, root)));

  const ceiling = (key) => (getKey(ceilingNode(key, root)));

  const rank = (key) => (rankNode(key, root));

  const select = (k) => (getKey(selectNode(k, root)));

  const put = (key, value) => {
    root = putNode(key, value, root);
  };

  const removeMin = () => {
    root = removeMinNode(root);
  };

  const removeMax = () => {
    root = removeMaxNode(root);
  };

  const remove = (key) => {
    root = removeNode(key, root);
  };

  const forEach = (callback) => {
    forEachNode(callback, root);
  };

  return {
    size,
    get,
    min,
    max,
    floor,
    ceiling,
    rank,
    select,
    put,
    removeMin,
    removeMax,
    remove,
    forEach,
  };
};

module.exports = ds;

// const a = ['S', 'E', 'X', 'A', 'R', 'C', 'H', 'M'];
// const bst = ds();
// for (let i = 0; i < a.length; i += 1) {
//   bst.put(a[i], a[i]);
// }

// const printNodes = () => {
//   console.log('===================');
//   let i = 0;
//   bst.forEach((node) => {
//     const left = node.left === null ? null : node.left.key;
//     const right = node.right === null ? null : node.right.key;
//     console.log(i, node.key, node.count, left, right);
//     i += 1;
//   });
//   console.log('===================');
// };

// printNodes();

// console.log('min:', bst.min());
// console.log('max:', bst.max());
// console.log('floor G:', bst.floor('G'));
// console.log('floor D:', bst.floor('D'));
// console.log('ceiling Q:', bst.ceiling('Q'));
// console.log('ceiling W:', bst.ceiling('W'));
// console.log('rank R:', bst.rank('R'));
// console.log('select 3:', bst.select(3));

// console.log('remove min');
// bst.removeMin();
// printNodes();
// console.log('remove max');
// bst.removeMax();
// printNodes();
// console.log('remove R');
// bst.remove('R');
// printNodes();
