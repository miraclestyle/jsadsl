const ds = (N) => {
  const id = Array.from(new Array(N), (e, i) => (i));
  const size = new Array(N).fill(1);

  const invalid = (p) => {
    if (p < 0 || p >= N) return true;
    return false;
  };

  const root = (p) => {
    let i = p;
    while (i !== id[i]) {
      id[i] = id[id[i]];
      i = id[i];
    }
    return i;
  };

  const union = (p, q) => {
    if (invalid(p) || invalid(q)) return false;
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
    (invalid(p) || invalid(q)) ? false : root(p) === root(q)
  );

  return Object.freeze({
    union,
    connected,
  });
};

module.exports = ds;
