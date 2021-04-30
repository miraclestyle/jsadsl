const { defaultGraphs } = require('../config');

const cfg = defaultGraphs;

module.exports.ConnectedComponents = require('./connected-components');
module.exports.DijkstraShortestPaths = require('./dijkstra-shortest-paths');
module.exports.FindDirectedCycle = require('./find-directed-cycle');
module.exports.FindUndirectedCycle = require('./find-undirected-cycle');
module.exports.FindWeightedDirectedCycle = require('./find-weighted-directed-cycle');
module.exports.FindWeightedUndirectedCycle = require('./find-weighted-undirected-cycle');
module.exports.FindCycle = require('./find-cycle');
module.exports.KruskalMST = require('./kruskal-mst');
module.exports.EagerPrimMST = require('./lazy-prim-mst');
module.exports.LazyPrimMST = require('./lazy-prim-mst');
module.exports.BellmanFord = require('./bellman-ford-shortest-paths');
module.exports.Order = require('./order');
module.exports.Reachable = require('./reachable');
module.exports.UnweightedShortestPaths = require('./unweighted-shortest-paths');
module.exports.TopologicalSort = require('./topological-sort');
module.exports.StrongConnectedComponents = require('./strong-connected-components');
module.exports.TwoColor = require('./two-color');
module.exports.EWDAGShortestLongestPaths = require('./edge-weighted-dag-shortest-longest-paths');
module.exports.CriticalPathMethod = require('./critical-path-method');

module.exports.PrimMST = module.exports[cfg.PrimMST];
