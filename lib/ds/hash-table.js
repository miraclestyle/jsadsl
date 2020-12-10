const ds = () => {
  let ht = new Array(1).fill(null);
  let count = 0;

  const Node = (key, val, next = null, previous = null) => (
    {
      key,
      val,
      next,
      previous,
    }
  );

  const hashString = (string, limit, radix) => {
    const m = string.length;
    let hash = 0;
    for (let i = 0; i < m; i += 1) {
      const exp = radix ** (m - (i + 1));
      const char = string.charCodeAt(i);
      const value = exp * char;
      hash += value;
      // console.log(char, exp, value, hash);
    }
    const mod = hash % limit;
    // console.log(mod);
    return mod;
  };

  const hash = (value, limit = ht.length, radix = 26) => {
    const hashFunctions = { string: hashString };
    return hashFunctions[typeof value](value, limit, radix);
  };

  const findNode = (key, head, callback) => {
    if (head !== null) {
      let node = head;
      while (node !== null) {
        if (node.key === key) {
          callback(node);
          break;
        }
        node = node.next;
      }
    }
  };

  const forEachNode = (head, callback) => {
    if (head !== null) {
      let node = head;
      while (node !== null) {
        callback(node);
        node = node.next;
      }
    }
  };

  const resize = (capacity) => {
    // console.log("==============");
    const copy = new Array(capacity).fill(null);
    for (let i = 0; i < ht.length; i += 1) {
      forEachNode(ht[i], (node) => {
        const index = hash(node.key, capacity);
        // console.log(node.key, index, capacity);
        const head = copy[index];
        if (head === null) {
          copy[index] = Node(node.key, node.val);
        } else {
          const newHead = Node(node.key, node.val, head);
          head.previous = newHead;
          copy[index] = newHead;
        }
      });
    }
    ht = copy;
    // console.log("==============");
  };

  const size = () => (count);

  const empty = () => (count === 0);

  const set = (key, val) => {
    let index = hash(key);
    const head = ht[index];
    let updated = false;
    findNode(key, head, (node) => {
      node.val = val;
      updated = true;
    });
    if (!updated) {
      if (count === ht.length) resize(ht.length * 2);
      const newHead = Node(key, val, head);
      if (head !== null) head.previous = newHead;
      index = hash(key);
      // console.log(key, index);
      ht[index] = newHead;
      count += 1;
    }
  };

  const get = (key) => {
    const index = hash(key, ht.length);
    const head = ht[index];
    let val = null;
    findNode(key, head, (node) => {
      val = node.val;
    });
    return val;
  };

  const remove = (key) => {
    const index = hash(key, ht.length);
    const head = ht[index];
    let val = null;
    findNode(key, head, (node) => {
      const { previous, next } = node;
      if (previous === null) ht[index] = next;
      if (previous !== null) previous.next = next;
      if (next !== null) next.previous = previous;
      count -= 1;
      if (count > 0 && count <= ht.length / 4) resize(ht.length / 2);
      val = node.val;
    });
    return val;
  };

  const contains = (key) => (get(key) !== null);

  const forEach = (callback) => {
    for (let i = 0; i < ht.length; i += 1) {
      forEachNode(ht[i], (node) => (callback(node.key, node.val)));
    }
  };

  return {
    size,
    empty,
    set,
    get,
    remove,
    contains,
    forEach,
  };
};

module.exports = ds;
