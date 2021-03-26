const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');

graph.repeat = repeat;

const names = ['CriticalPathMethod'];

const n = 10;
const durations = [
  41.0,
  51.0,
  50.0,
  36.0,
  38.0,
  45.0,
  21.0,
  32.0,
  32.0,
  29.0,
];
const precedents = new Array(n).fill(null);
precedents[0] = [1, 7, 9];
precedents[1] = [2];
precedents[6] = [3, 8];
precedents[7] = [3, 8];
precedents[8] = [2];
precedents[9] = [4, 6];

let algo = null;

describe.each(names)('%s', (name) => {
  beforeAll(() => {
    algo = graph[name](n, durations, precedents);
  });

  test('should verify order prop in the cpm results', () => {
    const expectedOrder = [
      { index: 0, start: 0, end: 41 },
      { index: 1, start: 41, end: 92 },
      { index: 2, start: 123, end: 173 },
      { index: 3, start: 91, end: 127 },
      { index: 4, start: 70, end: 108 },
      { index: 5, start: 0, end: 45 },
      { index: 6, start: 70, end: 91 },
      { index: 7, start: 41, end: 73 },
      { index: 8, start: 91, end: 123 },
      { index: 9, start: 41, end: 70 },
    ];
    expect(algo.order).toStrictEqual(expectedOrder);
  });

  test('should verify total prop in the cpm results', () => {
    expect(algo.total).toBe(173);
  });
});
