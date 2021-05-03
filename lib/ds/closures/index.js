const { defaultDataStructures } = require('../../config');

const cfg = defaultDataStructures;

module.exports.SinglyLinkedList = require('./singly-linked-list');
module.exports.DoublyLinkedList = require('./doubly-linked-list');
module.exports.DynamicArray = require('./dynamic-array');
module.exports.CircularQueue = require('./circular-queue');
module.exports.DynamicCircularQueue = require('./dynamic-circular-queue');
module.exports.LinkedQueue = require('./linked-queue');
module.exports.ArrayQueue = require('./array-queue');
module.exports.BST = require('./binary-search-tree');
module.exports.RBBST = require('./red-black-bst');
module.exports.LinearProbingHashTable = require('./linear-probing-hash-table');
module.exports.SeparateChainingHashTable = require('./separate-chaining-hash-table');

module.exports.IndexPriorityQueue = require('./index-priority-queue');
module.exports.PriorityQueue = require('./priority-queue');
module.exports.UnionFind = require('./union-find');

module.exports.Array = module.exports[cfg.Array];
module.exports.Queue = module.exports[cfg.Queue];
module.exports.SymbolTable = module.exports[cfg.SymbolTable];
module.exports.BinarySearchTree = module.exports[cfg.BinarySearchTree];
