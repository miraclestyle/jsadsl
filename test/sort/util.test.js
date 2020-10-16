const sort = require('../../lib/sort');

test('isSorted shoud run properly', () => {
  const sorted = [1, 2, 3, 4, 5];
  const unsorted = [5, 2, 3, 1, 4];
  const sortedDesc = [5, 4, 3, 2, 1];
  const partial = [1, 2, 3, 5, 4];
  const compare = (a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  };
  expect(sort.util.isSorted(sorted)).toBeTruthy();
  expect(sort.util.isSorted(unsorted)).toBeFalsy();
  expect(sort.util.isSorted(sortedDesc, compare)).toBeTruthy();
  expect(sort.util.isSorted(partial, undefined, 0, 2)).toBeTruthy();
});

test('defaultCompare should run properly', () => {
  expect(sort.util.defaultCompare(1, 2) < 0).toBeTruthy();
  expect(sort.util.defaultCompare(1, 1) === 0).toBeTruthy();
  expect(sort.util.defaultCompare(2, 1) > 0).toBeTruthy();
});
