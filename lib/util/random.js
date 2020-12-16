const randomInt = (low, high) => (
  low + Math.floor(Math.random() * (high - low))
);

module.exports = randomInt;
