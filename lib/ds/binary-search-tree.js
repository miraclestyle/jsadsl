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

  const getKey = (node) => (node === null ? null : node.key);

  const getValue = (node) => (node === null ? null : node.value);

  const validateKey = (key) => {
    if (key === null || key === undefined) {
      throw new Error('The key can not be null or undefined!');
    }
  };

  const getNode = (key, node) => {
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp < 0) return getNode(key, node.left);
    if (cmp > 0) return getNode(key, node.right);
    return node;
  };

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

  const selectNode = (rank, node) => { // kth key
    if (node === null) return null;
    const leftSize = sizeNode(node.left);
    if (leftSize > rank) return selectNode(rank, node.left);
    if (leftSize < rank) return selectNode(rank - leftSize - 1, node.right);
    return node;
  };

  const rangeSearchNode = (low, high, callback, node) => {
    if (node === null) return null;
    const lowCmp = compare(low, node.key);
    const highCmp = compare(high, node.key);
    if (lowCmp < 0) rangeSearchNode(low, high, callback, node.left);
    if (lowCmp <= 0 && highCmp >= 0) callback(node);
    if (highCmp > 0) rangeSearchNode(low, high, callback, node.right);
    return null;
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

  const empty = () => (sizeNode(root) === 0);

  const size = () => (sizeNode(root));

  const contains = (key) => {
    validateKey(key);
    return getKey(getNode(key, root)) !== null;
  };

  const get = (key) => {
    validateKey(key);
    return getValue(getNode(key, root));
  };

  const min = () => (getKey(minNode(root)));

  const max = () => (getKey(maxNode(root)));

  const floor = (key) => {
    validateKey(key);
    return getKey(floorNode(key, root));
  };

  const ceiling = (key) => {
    validateKey(key);
    return getKey(ceilingNode(key, root));
  };

  const rank = (key) => {
    validateKey(key);
    return rankNode(key, root);
  };

  const select = (k) => (getKey(selectNode(k, root)));

  const rangeCount = (low, high) => {
    validateKey(low);
    validateKey(high);
    const cmp = compare(low, high);
    if (cmp > 0) return 0;
    const range = rank(high) - rank(low);
    return contains(high) ? range + 1 : range;
  };

  const rangeSearch = (low, high, callback) => {
    validateKey(low);
    validateKey(high);
    return rangeSearchNode(low, high, callback, root);
  };

  const put = (key, value) => {
    validateKey(key);
    root = putNode(key, value, root);
  };

  const removeMin = () => {
    root = removeMinNode(root);
  };

  const removeMax = () => {
    root = removeMaxNode(root);
  };

  const remove = (key) => {
    validateKey(key);
    root = removeNode(key, root);
  };

  const forEach = (callback) => {
    forEachNode(callback, root);
  };

  return {
    empty,
    size,
    contains,
    get,
    min,
    max,
    floor,
    ceiling,
    rank,
    select,
    rangeCount,
    rangeSearch,
    put,
    removeMin,
    removeMax,
    remove,
    forEach,
  };
};

module.exports = ds;
