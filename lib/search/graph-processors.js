const { Stack, Queue } = require('../ds');
const { getType } = require('../util');

const ds = (graph) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const distance = new Array(graph.V()).fill(0);
  const id = new Array(graph.V()).fill(-1);
  let counter = 0;

  const count = () => (counter);

  const connected = (p, q) => (id[p] === id[q]);

  const component = (p) => (id[p]);

  const getDistance = (v) => (distance[v]);

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
    let s = '';
    while (!stack.empty()) {
      s += (stack.pop()).toString();
      if (!stack.empty()) s += '->';
    }
    return s;
  };

  const dfSearch = (p) => {
    discovered[p] = true;
    id[p] = counter;
    graph.edges(p, (q) => {
      if (!discovered[q]) {
        parent[q] = p;
        distance[q] = distance[p] + 1;
        dfSearch(q);
      }
    });
    processed[p] = true;
  };

  const dfs = (s) => {
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        if (!discovered[s[i]]) {
          dfSearch(s[i]);
          counter += 1;
        }
      }
    } else {
      dfSearch(s);
    }
  };

  const bfSearch = (queue) => {
    while (!queue.empty()) {
      const p = queue.dequeue();
      processed[p] = true;
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
    bfSearch(queue);
  };

  return {
    count,
    connected,
    component,
    getDistance,
    hasPath,
    getParent,
    getPath,
    dfs,
    bfs,
  };
};

module.exports = ds;

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

let gp = ds(g);
gp.bfs([1, 7, 10]);
console.log(gp.getDistance(4));
console.log(gp.getPath(4));
console.log(gp.getDistance(5));
console.log(gp.getPath(5));
console.log(gp.getDistance(12));
console.log(gp.getPath(12));

g = Graph(13);
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

gp = ds(g);
gp.dfs(Array.from(new Array(g.V()), (e, i) => (i)));
console.log(gp.count());
console.log(gp.connected(3, 6));
console.log(gp.connected(5, 10));
console.log(gp.component(5));
