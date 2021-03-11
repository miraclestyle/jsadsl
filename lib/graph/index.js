const { defaultGraphs } = require('../config');

const cfg = defaultGraphs;

module.exports.ConnectedComponents = require('./connected-components');
module.exports.DijkstraShortestPaths = require('./dijkstra-shortest-paths');
module.exports.FindCycle = require('./find-cycle');
module.exports.KruskalMST = require('./kruskal-mst');
module.exports.EagerPrimMST = require('./lazy-prim-mst');
module.exports.LazyPrimMST = require('./lazy-prim-mst');
module.exports.Order = require('./order');
module.exports.Reachable = require('./reachable');
module.exports.ShortestPaths = require('./shortest-paths');
module.exports.TopologicalSort = require('./topological-sort');
module.exports.StrongConnectedComponents = require('./strong-connected-components');
module.exports.TwoColor = require('./two-color');

module.exports.PrimMST = module.exports[cfg.PrimMST];
