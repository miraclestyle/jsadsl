const Node = (value, next = null, previous = null) => ({ value, next, previous });

const ds = () => {
  let head = null;
  let tail = null;
  let count = 0;

  const empty = () => (count === 0);

  const size = () => (count);

  const find = (value) => {
    let node = head;
    while (node !== null) {
      if (node.value === value) return node;
      node = node.next;
    }
    return null;
  };

  const remove = (value) => {
    const node = find(value);
    if (node === null) return;
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
  };

  const update = (oldValue, newValue) => {
    const node = find(oldValue);
    node.value = newValue;
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

  const forEach = (callback) => {
    let node = head;
    while (node !== null) {
      const first = node.previous === null;
      const last = node.next === null;
      callback(node, first, last);
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

  return {
    empty,
    size,
    find,
    remove,
    update,
    insertHead,
    insertTail,
    forEach,
    print,
  };
};

module.exports = ds;
