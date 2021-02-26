const { getType } = require('../util');

const search = (graph, source) => {
  const discovered = new Array(graph.V()).fill(false);
  let counter = 0;

  const hasPath = (p) => (discovered[p]);

  const count = () => (counter);

  const validateVertex = (v) => {
    if (getType(v) !== 'integer') {
      throw new Error('Invalid vertex type! The vertex is:', getType(v));
    }
  };

  const validateInput = (s) => {
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        validateVertex(s[i]);
      }
    } else {
      validateVertex(s);
    }
  };

  const dfs = (p) => {
    discovered[p] = true;
    counter += 1;
    graph.edges(p, (q) => {
      if (!discovered[q]) dfs(q);
    });
  };

  const run = (s) => {
    validateInput(s);
    if (getType(s) === 'array') {
      for (let i = 0; i < s.length; i += 1) {
        if (!discovered[s[i]]) dfs(s[i]);
      }
    } else if (getType(s) === 'integer') {
      dfs(s);
    }
  };

  run(source);

  return { hasPath, count };
};

module.exports = search;
