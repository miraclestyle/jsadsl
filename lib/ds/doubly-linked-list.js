const ds = () => {
  let head = null;
  let tail = null;
  let count = 0;

  const Node = (value, next = null, previous = null) => (
    { value, next, previous }
  );

  const size = () => (count);

  const empty = () => (count === 0);

  const find = (value) => {
    let node = head;
    while (node !== null) {
      if (node.value === value) return node;
      node = node.next;
    }
    return null;
  };

  const removeNode = (node) => {
    if (node === null) return null;
    const { previous, next } = node;
    if (previous === null && next === null) {
      head = null;
      tail = null;
    } else if (previous === null) {
      head = next;
      next.previous = null;
    } else if (next === null) {
      tail = previous;
      previous.next = null;
    } else {
      previous.next = next;
      next.previous = previous;
    }
    count -= 1;
    return node;
  };

  const remove = (value) => {
    const node = find(value);
    return removeNode(node);
  };

  const update = (oldValue, newValue) => {
    const node = find(oldValue);
    node.value = newValue;
  };

  const forEach = (callback) => {
    let node = head;
    let first = true;
    while (node !== null) {
      const last = node.next === null;
      callback(node, first, last);
      first = false;
      node = node.next;
    }
  };

  const print = () => {
    let output = '';
    forEach((node, first) => {
      output += first ? '' : '<->';
      output += (node.value).toString();
    });
    return output;
  };

  const insertHead = (value) => {
    const node = Node(value);
    if (head === null) {
      head = node;
      tail = node;
    } else {
      head.previous = node;
      node.next = head;
      head = node;
    }
    count += 1;
  };

  const removeHead = () => (removeNode(head));

  const getHead = () => (head);

  const insertTail = (value) => {
    const node = Node(value);
    if (tail === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      node.previous = tail;
      tail = node;
    }
    count += 1;
  };

  const removeTail = () => (removeNode(tail));

  const getTail = () => (tail);

  return {
    size,
    empty,
    find,
    remove,
    update,
    forEach,
    print,
    insertHead,
    removeHead,
    getHead,
    insertTail,
    removeTail,
    getTail,
  };
};

module.exports = ds;
