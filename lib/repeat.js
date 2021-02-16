const ds = (n) => {
  const uf = Array.from(new Array(n), (e, i) => (i));
  const size = new Array(n).fill(1);

  const validate = (p) => ((p < 0 || p > n - 1));

  const root = (p) => {
    let i = p;
    while (i !== uf[i]) {
      uf[i] = uf[uf[i]];
      i = uf[i];
    }
    return i;
  };

  const union = (p, q) => {
    if (validate(p) || validate(q)) return false;
    const pRoot = root(p);
    const qRoot = root(q);
    if (pRoot === qRoot) return true;
    if (size[pRoot] < size[qRoot]) {
      uf[pRoot] = qRoot;
      size[qRoot] += size[pRoot];
    } else {
      uf[qRoot] = pRoot;
      size[pRoot] += size[qRoot];
    }
    return true;
  };

  const connected = (p, q) => (
    validate(p) || validate(q) ? false : root(p) === root(q)
  );

  return {
    union,
    connected,
  };
};

module.exports = ds;
