const search = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const id = new Array(graph.V()).fill(-1);
  let counter = 0;

  const dfs = (p) => {
    discovered[p] = true;
    id[p] = counter;
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
  };

  graph.vertices((p) => {
    if (!discovered[p]) {
      dfs(p);
      counter += 1;
    }
  });

  const connected = (p, q) => (id[p] === id[q]);

  const component = (p) => (id[p]);

  const count = () => (counter);

  return { connected, component, count };
};

module.exports = search;

// const { Graph } = require('../ds');

// const g = Graph(13);
// g.addEdge(0, 5);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(0, 6);
// g.addEdge(6, 4);
// g.addEdge(4, 5);
// g.addEdge(4, 3);

// g.addEdge(7, 8);

// g.addEdge(9, 10);
// g.addEdge(9, 11);
// g.addEdge(9, 12);
// g.addEdge(11, 12);

// const gp = search(g);
// console.log(gp.count());
// console.log(gp.connected(3, 6));
// console.log(gp.connected(5, 10));
// console.log(gp.component(5));
