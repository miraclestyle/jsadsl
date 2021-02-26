const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { search, repeat } = require('../../lib');
const { Graph } = require('./data');

search.repeat = repeat;

const names = ['GraphConnectedComponents'];

let algo = null;

describe.each(names)('%s', (name) => {
  beforeAll(() => (
    Graph('tinyGraph.txt', false).then((graph) => {
      algo = search[name](graph);
      return algo;
    })
  ));

  test('should verify count method', () => {
    expect(algo.count()).toBe(3);
  });

  test('should verify component method', () => {
    expect(algo.component(5)).toBe(0);
    expect(algo.component(7)).toBe(1);
    expect(algo.component(11)).toBe(2);
  });

  test('should verify connected method', () => {
    expect(algo.connected(0, 1)).toBe(true);
    expect(algo.connected(3, 6)).toBe(true);
    expect(algo.connected(7, 8)).toBe(true);
    expect(algo.connected(10, 12)).toBe(true);
    expect(algo.connected(5, 10)).toBe(false);
  });
});
