const { Stack, Queue } = require('../ds');

const search = (graph, start, preprocess, process, postprocess) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let finished = false;

  const run = (s = start) => {
    const queue = Queue();
    queue.enqueue(s);
    discovered[s] = true;
    while (!queue.empty()) {
      if (finished) break;
      const p = queue.dequeue();
      preprocess(p);
      processed[p] = true;
      graph.edges(p, (q) => {
        if (!processed[q] || graph.isDirected()) {
          process(p, q);
        }
        if (!discovered[q]) {
          queue.enqueue(q);
          discovered[q] = true;
          parent[q] = p;
        }
      });
      postprocess(p);
    }
  };

  const terminate = () => {
    finished = true;
  };

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
    run,
    terminate,
    isDiscovered,
    isProcessed,
    hasPath,
    getParent,
    getPath,
  };
};

module.exports = search;
