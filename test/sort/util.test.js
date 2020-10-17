const sort = require('../../lib/sort');

describe('defaultCompare', () => {
  test('should return less than zero when "a" is less than "b"', () => {
    expect(sort.util.defaultCompare(1, 2) < 0).toBeTruthy();
  });

  test('should return zero when "a" equals to "b"', () => {
    expect(sort.util.defaultCompare(1, 1) === 0).toBeTruthy();
  });

  test('should return greater than zero when "a" is greater than "b"', () => {
    expect(sort.util.defaultCompare(2, 1) > 0).toBeTruthy();
  });
});

describe('randomIntRange', () => {
  test('should return 0', () => {
    const random = sort.util.randomIntRange(0);
    // console.log(random);
    expect(random).toEqual(0);
  });

  test('should return a random integer between 0 and 1', () => {
    const random = sort.util.randomIntRange(1);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
  });

  test('should return a random integer between 0 and 100', () => {
    const random = sort.util.randomIntRange(100);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
  });

  test('should return 0', () => {
    const random = sort.util.randomIntRange(0, 0);
    // console.log(random);
    expect(random).toEqual(0);
  });

  test('should return a random integer between 0 and 1', () => {
    const random = sort.util.randomIntRange(0, 1);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
  });

  test('should return a random integer between 0 and 100', () => {
    const random = sort.util.randomIntRange(0, 100);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
  });
});

describe('swap', () => {
  test('should handle single element array', () => {
    const array = [1];
    sort.util.swap(array, 0, 0);
    expect(array).toEqual([1]);
  });

  test('should not swap array elements', () => {
    const array = [1, 2, 3];
    sort.util.swap(array, 1, 1);
    expect(array).toEqual([1, 2, 3]);
  });

  test('should swap two array elements', () => {
    const array = [1, 2, 3];
    sort.util.swap(array, 0, 1);
    expect(array).toEqual([2, 1, 3]);
  });
});
