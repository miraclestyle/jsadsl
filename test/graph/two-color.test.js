const {
  describe,
  expect,
  test,
  beforeAll,
} = require('@jest/globals');
const { graph, repeat } = require('../../lib');
const { Graph } = require('./data');

graph.repeat = repeat;

const names = ['TwoColor'];

let algo = null;

describe.each(names)('%s', (name) => {
  beforeAll(() => (
    Graph('tinyGraph.txt', false).then((g) => {
      algo = graph[name](g);
      return algo;
    })
  ));

  test('should verify isTwoColored method', () => {
    expect(algo.isTwoColored()).toBe(false);
  });

  test('should verify getColor method', () => {
    expect(algo.getColor(6)).toBe('GREEN');
    expect(algo.getColor(4)).toBe('RED');
    expect(algo.getColor(5)).toBe('GREEN');
    expect(algo.getColor(3)).toBe('RED');
  });
});

describe.each(names)('%s', (name) => {
  beforeAll(() => (
    Graph('tinyAcyclicGraph.txt', false).then((g) => {
      algo = graph[name](g);
      return algo;
    })
  ));

  test('should verify isTwoColored method', () => {
    expect(algo.isTwoColored()).toBe(true);
  });

  test('should verify getColor method', () => {
    expect(algo.getColor(6)).toBe('GREEN');
    expect(algo.getColor(0)).toBe('RED');
    expect(algo.getColor(1)).toBe('RED');
    expect(algo.getColor(2)).toBe('RED');
    expect(algo.getColor(3)).toBe('RED');
    expect(algo.getColor(4)).toBe('RED');
    expect(algo.getColor(5)).toBe('RED');
    expect(algo.getColor(7)).toBe('RED');
    expect(algo.getColor(8)).toBe('RED');
    expect(algo.getColor(9)).toBe('RED');
    expect(algo.getColor(10)).toBe('RED');
    expect(algo.getColor(11)).toBe('RED');
    expect(algo.getColor(12)).toBe('RED');
  });
});
