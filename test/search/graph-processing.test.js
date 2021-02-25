const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {
  describe,
  expect,
  test,
  beforeEach,
} = require('@jest/globals');
const { ds, repeat } = require('../../lib');

ds.repeat = repeat;

let graph = null;

const composeCases = (names, arrayConfigs) => {
  const output = [];
  for (let i = 0; i < names.length; i += 1) {
    for (let j = 0; j < arrayConfigs.length; j += 1) {
      output.push([names[i], ...arrayConfigs[j]]);
    }
  }
  return output;
};

const buildConfig = (filePath, directed) => (
  new Promise((resolve, reject) => {
    const config = [];
    const edges = [];
    let position = 0;
    const file = fs.createReadStream(filePath);
    const lines = readline.createInterface({
      input: file,
      crlfDelay: Infinity,
    });
    lines.on('line', (line) => {
      const tuple = line.toString().split(' ').map((item) => (Number(item)));
      if (position === 0) config.push(tuple[0]);
      else if (position === 1) config.push(directed);
      else if (position > 1) edges.push(tuple);
      position += 1;
    });
    lines.on('close', () => {
      config.push(edges);
      if (config.length === 0) reject(new Error('buildConfig failed.'));
      else resolve(config);
    });
  })
);

const buildConfigs = () => (
  new Promise((resolve, reject) => {
    const names = ['Graph'];
    // const configs = [];
    const files = [
      path.resolve('.', 'test', 'ds', 'data', 'tinyGraph.txt'),
    ];
    const promises = files.map((filePath) => (buildConfig(filePath, false)));
    Promise.all(promises)
      .then((configs) => (resolve(composeCases(names, configs))))
      .catch((error) => (reject(error)));
  })
);

const buildConfigsSync = () => {
  const names = ['Graph'];
  const configs = [
    [13,
      false,
      [
        [0, 5], [4, 3],
        [0, 1], [9, 12],
        [6, 4], [5, 4],
        [0, 2], [11, 12],
        [9, 10], [0, 6],
        [7, 8], [9, 11],
        [5, 3],
      ],
    ],
  ];
  return composeCases(names, configs);
};

const init = (name, v, edges, directed = false) => {
  const output = ds[name](v, directed);
  for (let i = 0; i < edges.length; i += 1) {
    output.addEdge(...edges[i]);
  }
  return output;
};
const names = ['Graph'];

// beforeAll(() => (buildConfigs().then((results) => {
//   cases = results;
//   console.log(cases);
//   return cases;
// })));

// describe.each(names)('%s', (name) => {
//   beforeEach(() => {
//     graph = ds[name](13, false);
//   });

//   test('should verify V method on a non-empty graph', () => {
//     expect(graph.V()).toBe(13);
//   });
// });
