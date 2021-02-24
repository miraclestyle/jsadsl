const { GraphTopologicalSort } = require('.');

const search = (graph) => {
  const reversePostOrder = GraphTopologicalSort(graph.reverse());
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

  reversePostOrder.forEach((p) => {
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

const { Graph } = require('../ds');

const g = Graph(13, true);

// g.addEdge(4, 2);
// g.addEdge(2, 3);
// g.addEdge(3, 2);
// g.addEdge(6, 0);
// g.addEdge(0, 1);
// g.addEdge(2, 0);
// g.addEdge(11, 12);
// g.addEdge(12, 9);
// g.addEdge(9, 10);
// g.addEdge(9, 11);
// g.addEdge(7, 9);
// g.addEdge(10, 12);
// g.addEdge(11, 4);
// g.addEdge(4, 3);
// g.addEdge(3, 5);
// g.addEdge(6, 8);
// g.addEdge(8, 6);
// g.addEdge(5, 4);
// g.addEdge(0, 5);
// g.addEdge(6, 4);
// g.addEdge(6, 9);
// g.addEdge(7, 6);

g.addEdge(0, 1);
g.addEdge(0, 5);

g.addEdge(2, 0);
g.addEdge(2, 3);

g.addEdge(3, 2);
g.addEdge(3, 5);

g.addEdge(4, 2);
g.addEdge(4, 3);

g.addEdge(5, 4);

g.addEdge(6, 0);
g.addEdge(6, 4);
g.addEdge(6, 8);
g.addEdge(6, 9);

g.addEdge(7, 6);
g.addEdge(7, 9);

g.addEdge(8, 6);

g.addEdge(9, 10);
g.addEdge(9, 11);

g.addEdge(10, 12);

g.addEdge(11, 4);
g.addEdge(11, 12);

g.addEdge(12, 9);

// console.log(g.toString());

// const rg = g.reverse();
// console.log(rg.toString());

// console.log('=======');

const gp = search(g);
console.log(gp.count());
console.log('=======');
console.log(0, gp.component(0));
console.log(1, gp.component(1));
console.log(2, gp.component(2));
console.log(3, gp.component(3));
console.log(4, gp.component(4));
console.log(5, gp.component(5));
console.log(6, gp.component(6));
console.log(7, gp.component(7));
console.log(8, gp.component(8));
console.log(9, gp.component(9));
console.log(10, gp.component(10));
console.log(11, gp.component(11));
console.log(12, gp.component(12));
