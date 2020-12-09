const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare) => {
  const comp = typeof compare === 'function' ? compare : defaultCompare;
  return comp(a, b) < 0;
};

const Queue = () => {
  let head = null;
  let tail = null;
  let count = 0;

  const Node = (value, next = null) => ({ value, next });

  const empty = () => (count === 0);

  const enqueue = (value) => {
    const node = Node(value);
    if (head === null) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
    count += 1;
  };

  const dequeue = () => {
    if (empty()) return null;
    const { value } = head;
    head = head.next;
    if (head === null) {
      tail = null;
    }
    count -= 1;
    return value;
  };

  const peek = () => (head === null ? null : head.value);

  return {
    empty,
    enqueue,
    dequeue,
    peek,
  };
};

const merge = (array, compare, low, mid, high) => {
  const leftQ = Queue();
  const rightQ = Queue();
  for (let i = low; i <= mid; i += 1) {
    leftQ.enqueue(array[i]);
  }
  for (let i = mid + 1; i <= high; i += 1) {
    rightQ.enqueue(array[i]);
  }
  for (let i = low; i <= high; i += 1) {
    if (leftQ.empty()) {
      array[i] = rightQ.dequeue();
    } else if (rightQ.empty()) {
      array[i] = leftQ.dequeue();
    } else if (less(rightQ.peek(), leftQ.peek(), compare)) {
      array[i] = rightQ.dequeue();
    } else {
      array[i] = leftQ.dequeue();
    }
  }
};

const sort = (array, compare, low = 0, high = array.length - 1) => {
  if (high <= low) return;
  const mid = Math.floor((high + low) / 2);
  sort(array, compare, low, mid);
  sort(array, compare, mid + 1, high);
  merge(array, compare, low, mid, high);
};

module.exports = sort;
