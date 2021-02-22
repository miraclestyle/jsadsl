const search = (graph, start, preprocess, process, postprocess) => {
  const processed = new Array(graph.V()).fill(false);
  const discovered = new Array(graph.V()).fill(false);
  const parent = new Array(graph.V()).fill(-1);
  const entry = new Array(graph.V()).fill(0);
  const exit = new Array(graph.V()).fill(0);
  let time = 0;
  let finished = false;

  const terminate = () => {
    finished = true;
  };

  const run = (p = start) => {
    if (finished) return;
    discovered[p] = true;
    time += 1;
    entry[p] = time;
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
    time += 1;
    exit[p] = time;
    processed[p] = true;
  };

  return { run, terminate };
};

module.exports = search;
