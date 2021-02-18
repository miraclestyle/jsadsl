const ds = (inputCompare) => {
  const RED = true;
  const BLACK = false;
  let root = null;

  const defaultCompare = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const compare = typeof inputCompare === 'function' ? inputCompare : defaultCompare;

  const Node = (key, value, count = 1, color = RED) => ({
    key,
    value,
    count,
    color,
    left: null,
    right: null,
  });

  const isRed = (node) => (node === null ? false : node.color === RED);

  const sizeNode = (node) => (node === null ? 0 : node.count);

  const resizeNode = (node) => {
    node.count = sizeNode(node.left) + sizeNode(node.right) + 1;
    return node;
  };

  const rotateLeft = (node) => {
    const { right, color } = node;
    node.right = right.left;
    right.left = node;
    node.color = right.color;
    right.color = color;
    right.count = node.count;
    resizeNode(node);
    return right;
  };

  const rotateRight = (node) => {
    const { left, color } = node;
    node.left = left.right;
    left.right = node;
    node.color = left.color;
    left.color = color;
    left.count = node.count;
    resizeNode(node);
    return left;
  };

  const flipColors = (node) => {
    node.color = !node.color;
    if (node.left !== null) node.left.color = !node.left.color;
    if (node.right !== null) node.right.color = !node.right.color;
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
    resizeNode(node);
    return node;
  };

  const putNode = (key, value, node) => {
    if (node === null) return Node(key, value);
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = putNode(key, value, node.left);
    else if (cmp > 0) node.right = putNode(key, value, node.right);
    else node.value = value;
    return balance(node);
  };

  const getNode = (key, node) => {
    if (node === null) return null;
    const cmp = compare(key, node.key);
    if (cmp < 0) return getNode(key, node.left);
    if (cmp > 0) return getNode(key, node.right);
    return node;
  };

  const size = () => (sizeNode(root));

  const empty = () => (sizeNode(root) === 0);

  const put = (key, value) => {
    root = putNode(key, value, root);
    root.color = BLACK;
  };

  const get = (key) => {
    const node = getNode(key, root);
    return node === null ? null : node.value;
  };

  return {
    size,
    empty,
    put,
    get,
  };
};

module.exports = ds;
