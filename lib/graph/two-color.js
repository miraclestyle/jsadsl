const { Queue } = require('../ds');

const search = (graph) => {
  const RED = true;
  const GREEN = false;
  const UNCOLORED = null;
  const discovered = new Array(graph.V()).fill(false);
  const color = new Array(graph.V()).fill(UNCOLORED);
  let twoColored = true;

  const complement = (v) => (color[v] === RED ? GREEN : RED);

  const notTwoColored = () => {
    twoColored = false;
  };

  const getColor = (v) => (color[v] === RED ? 'RED' : 'GREEN');

  const isTwoColored = () => (twoColored);

  const bfs = (s) => {
    const queue = Queue();
    discovered[s] = true;
    queue.enqueue(s);
    while (!queue.empty()) {
      const p = queue.dequeue();
      graph.edges(p, (q) => {
        if (!discovered[q]) {
          discovered[q] = true;
          color[q] = complement(p);
          queue.enqueue(q);
        } else if (color[p] === color[q]) {
          notTwoColored();
        }
      });
    }
  };

  graph.vertices((p) => {
    if (!discovered[p]) {
      color[p] = RED;
      bfs(p);
    }
  });

  return { getColor, isTwoColored };
};

module.exports = search;

const { Graph } = require('../ds');

const g = Graph(4, false);

g.addEdge(2, 0);
g.addEdge(2, 1);
g.addEdge(2, 3);

const tc = search(g);
console.log(tc.isTwoColored());
console.log(tc.getColor(0));
console.log(tc.getColor(1));
console.log(tc.getColor(2));
console.log(tc.getColor(3));
