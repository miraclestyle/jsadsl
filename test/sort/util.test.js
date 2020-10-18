const sort = require('../../lib/sort');

describe('defaultCompare', () => {
  test('should return less than zero when "a" > "b"', () => {
    expect(sort.util.defaultCompare(1, 2)).toBeLessThan(0);
  });

  test('should return zero when "a" === "b"', () => {
    expect(sort.util.defaultCompare(1, 1)).toBe(0);
  });

  test('should return greater than zero when "a" < "b"', () => {
    expect(sort.util.defaultCompare(2, 1)).toBeGreaterThan(0);
  });
});

describe('randomInt', () => {
  test('should return 0 when argument is 0', () => {
    const random = sort.util.randomInt(0);
    // console.log(random);
    expect(random).toBe(0);
  });

  test('should return 0 when argument is 1', () => {
    const random = sort.util.randomInt(1);
    // console.log(random);
    expect(random).toBe(0);
  });

  test('should return between 0 and 1 when argument is 2', () => {
    const random = sort.util.randomInt(2);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(1);
  });

  test('should return between 0 and 100 when argument is 101', () => {
    const random = sort.util.randomInt(101);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(100);
  });

  test('should return 0 when arguments are 0 and 0', () => {
    const random = sort.util.randomInt(0, 0);
    // console.log(random);
    expect(random).toBe(0);
  });

  test('should return 0 when arguments are 0 and 1', () => {
    const random = sort.util.randomInt(0, 1);
    // console.log(random);
    expect(random).toBe(0);
  });

  test('should return between 0 and 1 when arguments are 0 and 2', () => {
    const random = sort.util.randomInt(0, 2);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(1);
  });

  test('should return between 0 and 100 when arguments are 0 and 101', () => {
    const random = sort.util.randomInt(0, 101);
    // console.log(random);
    expect(random).toBeGreaterThanOrEqual(0);
    expect(random).toBeLessThanOrEqual(100);
  });
});

describe('less', () => {
  test('shoud return true when arguments are 1 and 2', () => {
    expect(sort.util.less(1, 2)).toBe(true);
  });

  test('shoud return false when arguments are 2 and 1', () => {
    expect(sort.util.less(2, 1)).toBe(false);
  });

  test('shoud return false when arguments are 1 and 1', () => {
    expect(sort.util.less(1, 1)).toBe(false);
  });
});

describe('more', () => {
  test('shoud return false when arguments are 1 and 2', () => {
    expect(sort.util.more(1, 2)).toBe(false);
  });

  test('shoud return true when arguments are 2 and 1', () => {
    expect(sort.util.more(2, 1)).toBe(true);
  });

  test('shoud return false when arguments are 1 and 1', () => {
    expect(sort.util.more(1, 1)).toBe(false);
  });
});

describe('swap', () => {
  test('should handle single element array', () => {
    const array = [1];
    const expected = [1];
    sort.util.swap(array, 0, 0);
    expect(array).toEqual(expect.arrayContaining(expected));
  });

  test('should not swap array elements', () => {
    const array = [1, 2, 3];
    const expected = [1, 2, 3];
    sort.util.swap(array, 1, 1);
    expect(array).toEqual(expect.arrayContaining(expected));
  });

  test('should swap array elements', () => {
    const array = [1, 2, 3];
    const expected = [2, 1, 3];
    sort.util.swap(array, 0, 1);
    expect(array).toEqual(expect.arrayContaining(expected));
  });
});
