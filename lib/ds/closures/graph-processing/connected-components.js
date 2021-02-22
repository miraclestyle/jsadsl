const { depthFirst } = require('../../../search');

const ds = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const id = new Array(graph.V()).fill(-1);
  let counter = 0;

  const preprocess = (p) => {
    console.log(p);
    discovered[p] = true;
    id[p] = counter;
  };

  const process = (p) => (p);

  const postprocess = (p) => (p);

  const run = () => {
    const dfs = depthFirst(graph, null, preprocess, process, postprocess);
    for (let v = 0; v < graph.V(); v += 1) {
      if (!discovered) {
        dfs.run(v);
        counter += 1;
      }
      console.log(discovered);
    }
  };

  run();

  const count = () => (counter);

  const connected = (p, q) => (id[p] === id[q]);

  const component = (p) => (id[p]);

  return {
    count,
    connected,
    component,
  };
};

module.exports = ds;

const Graph = require('./adjacency-list-graph');

const g = Graph(13);
g.addEdge(0, 5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(0, 6);
g.addEdge(6, 4);
g.addEdge(4, 5);
g.addEdge(4, 3);

g.addEdge(7, 8);

g.addEdge(9, 10);
g.addEdge(9, 11);
g.addEdge(9, 12);
g.addEdge(11, 12);

const cc = ds(g);
console.log(cc.count());
console.log(cc.connected(3, 6));
console.log(cc.connected(5, 10));
console.log(cc.component(5));
