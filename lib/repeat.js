const search = (txt, pat, R = 256) => {
  const N = txt.length;
  const M = pat.length;
  const dfa = Array.from(new Array(R), () => (new Array(M).fill(0)));
  dfa[pat.charCodeAt(0)][0] = 1;
  for (let i = 1, x = 0; i < M; i += 1) {
    for (let c = 0; c < R; c += 1) {
      dfa[c][i] = dfa[c][x];
    }
    dfa[pat.charCodeAt(i)][i] = i + 1;
    x = dfa[pat.charCodeAt(i)][x];
  }
  let i;
  let j;
  for (i = 0, j = 0; i < N && j < M; i += 1) {
    j = dfa[txt.charCodeAt(i)][j];
  }
  if (j === M) return i - M;
  return -1;
};

module.exports = search;

const t = 'abcdefghijklmnopqrstuvwxyz';
const p = 'def';
const i = search(t, p);
console.log(i);
console.log(t.slice(i, i + p.length));
