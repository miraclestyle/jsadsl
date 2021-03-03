module.exports.defaultDataStructures = {
  Array: 'DynamicArray',
  Bag: 'LinkedBag',
  Stack: 'LinkedStack',
  Queue: 'LinkedQueue',
  SymbolTable: 'SeparateChainingHashTable',
  BinarySearchTree: 'RBBST',
  Graph: 'AdjacencyListGraph',
  WeightedGraph: 'AdjacencyListWeightedGraph',
  WeightedEdge: 'WeightedGraphEdge',
};

module.exports.defaultGraphs = {
  PrimMST: 'EagerPrimMST',
};

module.exports.useClosures = true;
