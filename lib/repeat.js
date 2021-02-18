const ds = (n) => {
  const id = Array.from(new Array(n), (e, i) => (i));
  const size = new Array(n).fill(1);

  const validate = (p) => (p < 0 || p > n - 1);

  const root = (p) => {
    let i = p;
    while (i !== id[i]) {
      id[i] = id[id[i]];
      i = id[i];
    }
    return i;
  };

  const union = (p, q) => {
    if (validate(p) || validate(q)) return false;
    const pid = root(p);
    const qid = root(q);
    if (pid === qid) return true;
    if (size[pid] < size[qid]) {
      id[pid] = qid;
      size[qid] += size[pid];
    } else {
      id[qid] = pid;
      size[pid] += size[qid];
    }
    return true;
  };

  const connected = (p, q) => (
    (validate(p) || validate(q)) ? false : root(p) === root(q)
  );

  return { union, connected };
};

module.exports = ds;
