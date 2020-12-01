const ds = require('../../lib/ds/index');

const structures = ['singlyLinkedList', 'doublyLinkedList'];
let list = null;

describe.each(structures)('%s', (name) => {
  beforeEach(()=> {
    list = ds[name]();
  });

  test('should report empty for an empty list', () => {
    expect(list.empty()).toBe(true);
  });

  test('should report size of 0 for an empty list', () => {
    expect(list.size()).toBe(0);
  });

  test('should find null in an empty list', () => {
    expect(list.find(100)).toBe(null);
  });

  test('should add one head item to an empty list', () => {
    list.insertHead(100);
    expect(list.size()).toBe(1);
  });

  test('should add one tail item to an empty list', () => {
    list.insertTail(100);
    expect(list.size()).toBe(1);
  });

  test('should add two head items to an empty list', () => {
    list.insertHead(2);
    list.insertHead(1);
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([1, 2]);
  });

  test('should add two tail items to an empty list', () => {
    list.insertTail(2);
    list.insertTail(1);
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([2, 1]);
  });

  test('should add one head and one tail item to an empty list', () => {
    list.insertHead(2);
    list.insertTail(1);
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([2, 1]);
  });

  test('should report non-empty for a list with one item', () => {
    list.insertHead(100);
    expect(list.empty()).toBe(false);
  });

  test('should report size of 1 for a list with one item', () => {
    list.insertHead(100);
    expect(list.size()).toBe(1);
  });

  test('should find a node in a list with one item', () => {
    list.insertHead(100);
    const node = list.find(100);
    expect(node.value).toBe(100);
  });

  test('should add multiple head items to an empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
  });

  test('should add multiple tail items to an empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertTail(i * 10);
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  });

  test('should add multiple head-tail items to an empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      if (i % 2 === 0) {
        list.insertHead(i * 10);
      } else {
        list.insertTail(i * 10);
      }
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 80, 60, 40, 20, 10, 30, 50, 70, 90]);
  });

  test('should not remove an item from an empty list', () => {
    list.remove(100);
    expect(list.empty()).toBe(true);
  });

  test('should not remove head item from an empty list', () => {
    list.removeHead();
    expect(list.empty()).toBe(true);
  });

  test('should not remove tail item from an empty list', () => {
    list.removeTail();
    expect(list.empty()).toBe(true);
  });

  test('should remove the last item from a non-empty list', () => {
    list.insertHead(100);
    list.remove(100);
    expect(list.empty()).toBe(true);
  });

  test('should remove an item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    list.remove(60);
    array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 50, 40, 30, 20, 10]);
  });

  test('should remove head item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    list.removeHead();
    array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([90, 80, 70, 60, 50, 40, 30, 20, 10]);
  });

  test('should remove tail item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    list.removeTail();
    array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20]);
  });

  test('should remove multiple items from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    list.remove(50);
    list.remove(70);
    list.remove(30);
    list.remove(10);
    list.remove(100);
    array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([90, 80, 60, 40, 20]);
  });

  test('should remove head and tail item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    list.removeHead();
    list.removeTail();
    array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([90, 80, 70, 60, 50, 40, 30, 20]);
  });

  test('should remove all items from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    for (let i = 1; i <= 10; i += 1) {
      list.remove(i * 10);
    }
    expect(list.empty()).toBe(true);
  });

  test('should remove head items from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    while (!list.empty()) {
      list.removeHead();
    }
    expect(list.empty()).toBe(true);
  });

  test('should remove tail items from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const array = [];
    list.forEach((node) => array.push(node.value));
    expect(array).toEqual([100, 90, 80, 70, 60, 50, 40, 30, 20, 10]);
    while (!list.empty()) {
      list.removeTail();
    }
    expect(list.empty()).toBe(true);
  });

  test('should find a node in a list with multiple items', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const node = list.find(50);
    expect(node.value).toBe(50);
  });

  test('should get head item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const node = list.getHead();
    expect(node.value).toBe(100);
  });

  test('should get tail item from a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const node = list.getTail();
    expect(node.value).toBe(10);
  });

  test('should iterate over multiple items in a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    let i = 10;
    list.forEach((node) => {
      expect(node.value).toBe(i * 10);
      i -= 1;
    });
  });

  test('should print multiple items in a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    const singly = '100->90->80->70->60->50->40->30->20->10';
    const doubly = '100<->90<->80<->70<->60<->50<->40<->30<->20<->10';
    if (name === 'singlyLinkedList') expect(list.print()).toBe(singly);
    if (name === 'doublyLinkedList') expect(list.print()).toBe(doubly);
  });

  test('should update an item in a non-empty list', () => {
    for (let i = 1; i <= 10; i += 1) {
      list.insertHead(i * 10);
    }
    list.update(50, 55);
    const node50 = list.find(50);
    const node55 = list.find(55);
    expect(node50).toBe(null);
    expect(node55.value).toBe(55);
  });
});
