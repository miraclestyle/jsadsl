const search = (graph) => {
  const GREEN = false;
  const RED = true;
  const discovered = new Array(graph.V()).fill(false);
  const colors = new Array(graph.V()).fill(null);
  let twoColored = true;

  const complement = (v) => (colors[v] === GREEN ? RED : GREEN);

  const isTwoColored = () => (twoColored);

  const getColor = (v) => {
    if (colors[v] === RED) return 'RED';
    if (colors[v] === GREEN) return 'GREEN';
    return 'UNCOLORED';
  };

  const dfs = (v) => {
    if (!isTwoColored()) return;
    discovered[v] = true;
    graph.edges(v, (u) => {
      if (!discovered[u]) {
        colors[u] = complement(v);
        dfs(u);
      } else if (colors[v] === colors[u]) {
        twoColored = false;
      }
    });
  };

  graph.vertices((v) => {
    if (isTwoColored() && !discovered[v]) {
      colors[v] = RED;
      dfs(v);
    }
  });

  return Object.freeze({
    isTwoColored,
    getColor,
  });
};

module.exports = search;
