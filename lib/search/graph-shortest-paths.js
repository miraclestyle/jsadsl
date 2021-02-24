const { Queue, Stack } = require('../ds');
const { getType } = require('../util');

const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const distance = new Array(graph.V()).fill(0);

  const bfs = (s) => {
    const queue = Queue();
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        queue.enqueue(s[i]);
        discovered[s[i]] = true;
      }
    } else {
      queue.enqueue(s);
      discovered[s] = true;
    }
    while (!queue.empty()) {
      const p = queue.dequeue();
      graph.edges(p, (q) => {
        if (!discovered[q]) {
          queue.enqueue(q);
          discovered[q] = true;
          parent[q] = p;
          distance[q] = distance[p] + 1;
        }
      });
    }
  };

  bfs(source);

  const hasPath = (v) => (discovered[v]);

  const getParent = (v) => (parent[v]);

  const getDistance = (p) => (distance[p]);

  const shortestPathTo = (p) => {
    const stack = Stack();
    for (let child = p; child !== -1; child = parent[child]) {
      stack.push(child);
    }
    return stack;
  };

  const shortestPathToString = (p) => {
    const stack = shortestPathTo(p);
    let s = '';
    while (!stack.empty()) {
      s += (stack.pop()).toString();
      if (!stack.empty()) s += '->';
    }
    return s;
  };

  return {
    hasPath,
    getParent,
    getDistance,
    shortestPathTo,
    shortestPathToString,
  };
};

module.exports = search;

const { Graph } = require('../ds');

let g = Graph(13, true);
g.addEdge(4, 2);
g.addEdge(2, 3);
g.addEdge(3, 2);
g.addEdge(6, 0);
g.addEdge(0, 1);
g.addEdge(2, 0);
g.addEdge(11, 12);
g.addEdge(12, 9);
g.addEdge(9, 10);
g.addEdge(9, 11);
g.addEdge(7, 9);
g.addEdge(10, 12);
g.addEdge(11, 4);
g.addEdge(4, 3);
g.addEdge(3, 5);
g.addEdge(6, 8);
g.addEdge(8, 6);
g.addEdge(5, 4);
g.addEdge(0, 5);
g.addEdge(6, 4);
g.addEdge(6, 9);
g.addEdge(7, 6);

let gp = search(g, [1, 7, 10]);
console.log(gp.getDistance(4));
gp.shortestPathTo(4).forEach((item) => {
  console.log(item);
});
console.log(gp.shortestPathToString(4));
console.log(gp.getDistance(5));
gp.shortestPathTo(5).forEach((item) => {
  console.log(item);
});
console.log(gp.shortestPathToString(5));
console.log(gp.getDistance(12));
gp.shortestPathTo(12).forEach((item) => {
  console.log(item);
});
console.log(gp.shortestPathToString(12));
