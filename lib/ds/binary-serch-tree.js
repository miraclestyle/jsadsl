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

  const putNode = (key, value, node) => {
    if (node === null) return Node(key, value, 1);
    const cmp = compare(key, node.key);
    if (cmp < 0) node.left = putNode(key, value, node.left);
    else if (cmp > 0) node.right = putNode(key, value, node.right);
    else node.value = value;
    node.count = 1 + sizeNode(node.left) + sizeNode(node.right);
    return node;
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

  const size = () => (sizeNode(root));

  const put = (key, value) => {
    root = putNode(key, value, root);
  };

  const get = (key) => {
    const node = getNode(key, root);
    return node === null ? null : node.value;
  };

  const min = () => {
    const node = minNode(root);
    return node === null ? null : node.key;
  };

  const max = () => {
    const node = maxNode(root);
    return node === null ? null : node.key;
  };

  return {
    size,
    put,
    get,
    min,
    max,
  };
};
module.exports = ds;
