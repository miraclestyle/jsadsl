const ds = () => {
  let head = null;
  let tail = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

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

  const remove = (value) => {
    let node = head;
    let previous = null;
    while (node !== null) {
      if (node.value === value) {
        if (previous === null) {
          head = node.next;
          tail = node.next === null ? null : tail;
        } else {
          previous.next = node.next;
          tail = node.next === null ? previous : tail;
        }
        count -= 1;
        return node;
      }
      previous = node;
      node = node.next;
    }
    return null;
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
      output += first ? '' : '->';
      output += (node.value).toString();
    });
    return output;
  };

  const insertHead = (value) => {
    if (head === null) {
      const node = Node(value);
      head = node;
      tail = node;
    } else {
      head = Node(value, head);
    }
    count += 1;
  };

  const removeHead = () => (head === null ? null : remove(head.value));

  const getHead = () => (head);

  const insertTail = (value) => {
    const node = Node(value);
    if (tail === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
    count += 1;
  };

  const removeTail = () => (tail === null ? null : remove(tail.value));

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
