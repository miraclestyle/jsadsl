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

  const getColor = (v) => {
    if (color[v] === RED) return 'RED';
    if (color[v] === GREEN) return 'GREEN';
    return 'UNCOLORED';
  };

  const isTwoColored = () => (twoColored);

  const dfs = (p) => {
    if (!isTwoColored()) return;
    discovered[p] = true;
    graph.edges(p, (q) => {
      if (!discovered[q]) {
        color[q] = complement(p);
        dfs(q);
      } else if (color[q] === color[p]) {
        notTwoColored();
      }
    });
  };

  graph.vertices((p) => {
    if (isTwoColored() && !discovered[p]) {
      color[p] = RED;
      dfs(p);
    }
  });

  return { getColor, isTwoColored };
};

module.exports = search;
