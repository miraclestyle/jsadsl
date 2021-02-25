const path = require('path');
const {
  describe,
  expect,
  test,
  beforeAll,
  beforeEach,
} = require('@jest/globals');
const { search, repeat } = require('../../lib');

const { Graph } = require('./data');

search.repeat = repeat;

const getFilePath = (fileName) => (
  path.resolve('.', 'test', 'search', 'data', fileName)
);

const buildGraphs = () => (
  new Promise((resolve, reject) => {
    const cases = [
      {
        name: 'GraphConnectedComponentsTiny',
        algo: 'GraphConnectedComponents',
        file: getFilePath('tinyGraph.txt'),
        directed: false,
        graph: null,
      },
    ];
    const promises = cases.map((e) => (Graph(e.file, e.directed)));
    Promise.all(promises)
      .then((results) => {
        const options = cases.map((e, i) => {
          e.graph = results[i];
          return e;
        });
        resolve(options);
      })
      .catch((error) => (reject(error)));
  })
);

let graphs;

beforeAll(() => {
  buildGraphs().then((options) => {
    graphs = options;
  });
});

let algo = null;
describe('GraphConnectedComponents', () => {
  beforeEach(() => {
    algo = search[graphs[0].algo](graphs[0].graph);
  });

  test('should verify count method on GraphConnectedComponents', () => {
    expect(algo.count()).toBe(3);
  });

  test('should verify component method on GraphConnectedComponents', () => {
    expect(algo.component(5)).toBe(0);
    expect(algo.component(7)).toBe(1);
    expect(algo.component(11)).toBe(2);
  });

  test('should verify connected method on GraphConnectedComponents', () => {
    expect(algo.connected(0, 1)).toBe(true);
    expect(algo.connected(3, 6)).toBe(true);
    expect(algo.connected(7, 8)).toBe(true);
    expect(algo.connected(10, 12)).toBe(true);
    expect(algo.connected(5, 10)).toBe(false);
  });
});
