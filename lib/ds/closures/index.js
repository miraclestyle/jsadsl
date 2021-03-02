const { defaultDataStructures } = require('../../config');

const cfg = defaultDataStructures;

module.exports.SinglyLinkedList = require('./singly-linked-list');
module.exports.DoublyLinkedList = require('./doubly-linked-list');
module.exports.DynamicArray = require('./dynamic-array');
module.exports.CircularQueue = require('./circular-queue');
module.exports.DynamicCircularQueue = require('./dynamic-circular-queue');
module.exports.LinkedStack = require('./linked-stack');
module.exports.LinkedQueue = require('./linked-queue');
module.exports.LinkedBag = require('./linked-bag');
module.exports.ArrayStack = require('./array-stack');
module.exports.ArrayQueue = require('./array-queue');
module.exports.ArrayBag = require('./array-bag');
module.exports.BST = require('./binary-search-tree');
module.exports.RBBST = require('./red-black-bst');
module.exports.WeightedGraphEdge = require('./weighted-graph-edge.js');
module.exports.AdjacencyListGraph = require('./adjacency-list-graph');
module.exports.AdjacencyListWeightedGraph = require('./adjacency-list-weighted-graph');
module.exports.LinearProbingHashTable = require('./linear-probing-hash-table');
module.exports.SeparateChainingHashTable = require('./separate-chaining-hash-table');

module.exports.PriorityQueue = require('./priority-queue');
module.exports.UnionFind = require('./union-find');

module.exports.Array = module.exports[cfg.Array];
module.exports.Bag = module.exports[cfg.Bag];
module.exports.Stack = module.exports[cfg.Stack];
module.exports.Queue = module.exports[cfg.Queue];
module.exports.SymbolTable = module.exports[cfg.SymbolTable];
module.exports.BinarySearchTree = module.exports[cfg.BinarySearchTree];
module.exports.WeightedEdge = module.exports[cfg.WeightedEdge];
module.exports.Graph = module.exports[cfg.Graph];
module.exports.WeightedGraph = module.exports[cfg.WeightedGraph];
