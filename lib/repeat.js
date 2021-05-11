const search = (txt, pat, R = 256) => {
  const N = txt.length;
  const M = pat.length;
  const right = new Array(R).fill(-1);
  for (let i = 0; i < M; i += 1) {
    right[pat.charCodeAt(i)] = i;
  }
  let skip;
  for (let i = 0; i <= N - M; i += skip) {
    skip = 0;
    for (let j = M - 1; j >= 0; j -= 1) {
      if (pat.charCodeAt(j) !== txt.charCodeAt(i + j)) {
        skip = Math.max(1, j - right[txt.charCodeAt(i + j)]);
        break;
      }
    }
    if (skip === 0) return i;
  }
  return -1;
};

module.exports = search;

const t = 'abcdefghijklmnopqrstuvwxyz';
const p = 'def';
const i = search(t, p);
console.log(i);
console.log(t.slice(i, i + p.length));
