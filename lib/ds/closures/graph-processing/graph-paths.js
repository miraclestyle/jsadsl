const { depthFirst } = require('../../../search');
const { Stack } = require('../..');

const ds = (graph, start) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const entry = new Array(graph.V()).fill(0);
  const exit = new Array(graph.V()).fill(0);
  let time = 0;

  const preprocess = (p) => {
    time += 1;
    entry[p] = time;
    discovered[p] = true;
  };

  const process = (p, q) => {
    if (!discovered[q]) parent[q] = p;
  };

  const postprocess = (p) => {
    time += 1;
    exit[p] = time;
    processed[p] = true;
  };

  const dfs = depthFirst(graph, start, preprocess, process, postprocess);
  dfs.run();

  const isDiscovered = (v) => (discovered[v]);

  const isProcessed = (v) => (processed[v]);

  const hasPath = (v) => (discovered[v]);

  const getParent = (v) => (parent[v]);

  const getPath = (v) => {
    const stack = Stack();
    stack.push(v);
    let p = parent[v];
    while (p !== -1) {
      stack.push(p);
      p = parent[p];
    }
    return stack;
  };

  return {
    isDiscovered,
    isProcessed,
    hasPath,
    getParent,
    getPath,
  };
};

module.exports = ds;

const Graph = require('./adjacency-list-graph');

const g = Graph(7);
g.addEdge(0, 5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(0, 6);
g.addEdge(6, 4);
g.addEdge(4, 5);
g.addEdge(4, 3);

const find = ds(g, 0);
find.getPath(3).forEach((item) => {
  console.log(item);
});
