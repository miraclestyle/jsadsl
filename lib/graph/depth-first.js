const search = (graph, preprocess, process, postprocess) => {
  const discovered = new Array(graph.V()).fill(false);
  const processed = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  let finished = false;

  const run = (p) => {
    if (finished) return;
    discovered[p] = true;
    preprocess(p);
    graph.edges(p, (q) => {
      if (!discovered[q]) {
        parent[q] = p;
        process(p, q);
        run(q);
      } else if ((!processed[q] && parent[p] !== q) || graph.isDirected()) {
        process(p, q);
      }
    });
    postprocess(p);
    processed[p] = true;
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
