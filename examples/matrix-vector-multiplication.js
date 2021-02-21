const { ds } = require('../lib');

const st = ds.separateChainingHashTable;

const MVMultiplication = (m, v) => {
  const matrix = m;
  const vector = v;
  const size = v.length;
  const result = new Array(size).fill(0);

  const multiply = () => {
    for (let i = 0; i < size; i += 1) {
      let sum = 0.0;
      for (let j = 0; j < size; j += 1) {
        sum += matrix[i][j] * vector[j];
      }
      sum = Number(Number.parseFloat(sum).toPrecision(6));
      result[i] = sum;
    }
  };

  const getResult = () => (result);

  return {
    multiply,
    getResult,
  };
};

const SparseVector = () => {
  const v = st();

  const put = (i, val) => (v.put(i, val));

  const get = (i) => (v.contains(i) ? v.get(i) : 0.0);

  const dot = (vector) => {
    let sum = 0.0;
    v.forEach((i, val) => {
      sum += vector[parseInt(i, 10)] * val;
    });
    return Number(Number.parseFloat(sum).toPrecision(6));
  };

  return {
    put,
    get,
    dot,
  };
};

const SparseMVMultiplication = (m, v) => {
  const matrix = Array.from(new Array(m.length), (e) => SparseVector());
  const vector = v;
  const size = v.length;
  const result = new Array(size).fill(0);

  const init = () => {
    for (let i = 0; i < m.length; i += 1) {
      for (let j = 0; j < m[i].length; j += 1) {
        if (m[i][j] > 0) matrix[i].put(j, m[i][j]);
      }
    }
  };

  init();

  const multiply = () => {
    for (let i = 0; i < size; i += 1) {
      result[i] = matrix[i].dot(vector);
    }
  };

  const getResult = () => (result);

  return {
    multiply,
    getResult,
  };
};

const matrix = [
  [0, 0.90, 0, 0, 0],
  [0, 0, 0.36, 0.36, 0.18],
  [0, 0, 0, 0.90, 0],
  [0.90, 0, 0, 0, 0],
  [0.47, 0, 0.47, 0, 0],
];

const vector = [
  0.05,
  0.04,
  0.36,
  0.37,
  0.19,
];

const mvm = MVMultiplication(matrix, vector);
mvm.multiply();
console.log(mvm.getResult());

const smvm = SparseMVMultiplication(matrix, vector);
smvm.multiply();
console.log(smvm.getResult());
