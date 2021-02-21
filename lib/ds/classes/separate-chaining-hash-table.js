const { hashString, getType } = require('../../util');

class SymbolTable {
  constructor() {
    this.st = new Array(1).fill(null);
    this.capacity = 1;
    this.count = 0;
  }

  Node(key, val, next = null) {
    return {
      key,
      val,
      next,
    };
  }

  hash(value, limit = this.capacity) {
    if (getType(value) === 'string') {
      return hashString(value) % limit;
    }
    return hashString(JSON.stringify(value)) % limit;
  }

  forEach(callback) {
    for (let i = 0; i < this.capacity; i += 1) {
      for (let node = this.st[i]; node !== null; node = node.next) {
        callback(node.key, node.val);
      }
    }
  }

  resize(newCapacity) {
    const copy = new Array(newCapacity).fill(null);
    this.forEach((key, val) => {
      const index = this.hash(key, newCapacity);
      const head = copy[index];
      copy[index] = this.Node(key, val, head);
    });
    this.capacity = newCapacity;
    this.st = copy;
  }

  size() {
    return this.count;
  }

  empty() {
    return this.count === 0;
  }

  put(key, val) {
    for (let node = this.st[this.hash(key)]; node !== null; node = node.next) {
      if (key === node.key) {
        node.val = val;
        return;
      }
    }
    if (this.size() === this.capacity) this.resize(this.capacity * 2);
    const index = this.hash(key);
    this.st[index] = this.Node(key, val, this.st[index]);
    this.count += 1;
  }

  get(key) {
    for (let node = this.st[this.hash(key)]; node !== null; node = node.next) {
      if (key === node.key) {
        return node.val;
      }
    }
    return null;
  }

  remove(key) {
    const index = this.hash(key);
    let node = this.st[index];
    let val = null;
    if (node !== null && node.key === key) {
      val = node.val;
      this.st[index] = node.next;
      this.count -= 1;
    } else if (node !== null) {
      while (node.next !== null) {
        if (node.next.key === key) {
          val = node.next.val;
          node.next = node.next.next;
          this.count -= 1;
          break;
        }
        node = node.next;
      }
    }
    if (this.size() > 0 && this.size() * 4 <= this.capacity) {
      this.resize(this.capacity / 2);
    }
    return val;
  }

  contains(key) {
    return this.get(key) !== null;
  }
};

module.exports = SymbolTable;
