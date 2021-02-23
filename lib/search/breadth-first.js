const { Queue } = require('../ds');

const search = (graph, preprocess, process, postprocess) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let finished = false;

  const run = (s) => {
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

  return {
    run,
    terminate,
  };
};

module.exports = search;
