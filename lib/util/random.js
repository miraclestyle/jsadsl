const randomInt = (low, high) => {
  const start = high === undefined ? 0 : low;
  const end = high === undefined ? low : high;
  const random = Math.random();
  const product = random * (end - start);
  const floor = Math.floor(product);
  const result = start + floor;
  return result;
};

module.exports = randomInt;
