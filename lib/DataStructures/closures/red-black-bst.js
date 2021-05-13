const { defaultCompare } = require('../../util');

const ds = (compare = defaultCompare) => {
  const RED = true;
  const BLACK = false;
  let root = null;

  const Node = (key, value, count, color) => (
    {
      key,
      value,
      count,
      color,
      left: null,
      right: null,
    }
  );

  const isRed = (node) => (node === null ? false : node.color === RED);

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

  // ==================== Modifying Methods ====================

  const resizeNode = (node) => {
    node.count = 1 + sizeNode(node.left) + sizeNode(node.right);
    return node;
  };

  const rotateLeft = (node) => {
    const { right } = node;
    node.right = right.left;
    right.left = node;
    right.color = node.color;
    node.color = RED;
    right.count = node.count;
    resizeNode(node);
    return right;
  };

  const rotateRight = (node) => {
    const { left } = node;
    node.left = left.right;
    left.right = node;
    left.color = node.color;
    node.color = RED;
    left.count = node.count;
    resizeNode(node);
    return left;
  };

  const flipColors = (node) => {
    node.color = !node.color;
    node.left.color = !node.left.color;
    node.right.color = !node.right.color;
  };

  const moveRedLeft = (node) => {
    flipColors(node);
    if (isRed(node.right.left)) {
      node.right = rotateRight(node.right);
      node = rotateLeft(node);
      flipColors(node);
    }
    return node;
  };

  const moveRedRight = (node) => {
    flipColors(node);
    if (isRed(node.left.left)) {
      node = rotateRight(node);
      flipColors(node);
    }
    return node;
  };

  const balance = (node) => {
    if (isRed(node.right) && !isRed(node.left)) node = rotateLeft(node);
    if (isRed(node.left) && isRed(node.left.left)) node = rotateRight(node);
    if (isRed(node.left) && isRed(node.right)) flipColors(node);
    return resizeNode(node);
  };

  const putNode = (key, value, node) => {
    if (node === null) return Node(key, value, 1, RED);
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = putNode(key, value, node.left);
    else if (cmp > 0) node.right = putNode(key, value, node.right);
    else node.value = value;
    return balance(node);
  };

  const removeMinNode = (node) => {
    // if (node === null) return null;
    if (node.left === null) return null;
    if (!isRed(node.left) && !isRed(node.left.left)) {
      node = moveRedLeft(node);
    }
    node.left = removeMinNode(node.left);
    return balance(node);
  };

  const removeMaxNode = (node) => {
    // if (node === null) return null;
    if (isRed(node.left)) node = rotateRight(node);
    if (node.right === null) return null;
    if (!isRed(node.right) && !isRed(node.right.left)) {
      node = moveRedRight(node);
    }
    node.right = removeMaxNode(node.right);
    return balance(node);
  };

  const removeNode = (key, node) => {
    // if (node === null) return null;
    if (compare(key, node.key) < 0) {
      if (!isRed(node.left) && !isRed(node.left.left)) {
        node = moveRedLeft(node);
      }
      node.left = removeNode(key, node.left);
    } else {
      if (isRed(node.left)) node = rotateRight(node);
      if (compare(key, node.key) === 0 && node.right === null) return null;
      if (!isRed(node.right) && !isRed(node.right.left)) {
        node = moveRedRight(node);
      }
      if (compare(key, node.key) === 0) {
        temp = minNode(node.right);
        node.key = temp.key;
        node.value = temp.value;
        node.right = removeMinNode(node.right);
      } else {
        node.right = removeNode(key, node.right);
      }
    }
    return balance(node);
  };

  // ============================================================

  const forEachNode = (callback, node) => {
    if (node === null) return null;
    forEachNode(callback, node.left);
    callback(node);
    forEachNode(callback, node.right);
    return null;
  };

  const empty = () => (sizeNode(root) === 0);

  const rootToBlack = () => {
    if (!empty()) root.color = BLACK;
  };

  const rootToRed = () => {
    if (!isRed(root.left) && !isRed(root.right)) root.color = RED;
  };

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
    rootToBlack();
  };

  const removeMin = () => {
    if (empty()) return;
    rootToRed();
    root = removeMinNode(root);
    rootToBlack();
  };

  const removeMax = () => {
    if (empty()) return;
    rootToRed();
    root = removeMaxNode(root);
    rootToBlack();
  };

  const remove = (key) => {
    if (!contains(key)) return;
    rootToRed();
    root = removeNode(key, root);
    rootToBlack();
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
