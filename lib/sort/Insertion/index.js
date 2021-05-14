const InsertionW = require('./InsertionW');
const InsertionX = require('./InsertionX');

const Insertion = (fast = true) => {
  if (fast) return InsertionX();
  return InsertionW();
};

module.exports = Insertion;
