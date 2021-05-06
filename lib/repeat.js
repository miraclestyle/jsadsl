const search = (txt, pat) => {
  const N = txt.length;
  const M = pat.length;
  const R = 26; // it can be outsourced as a parameter

  // it can be outsourced as a paramteter
  const getCode = (string, index, ref = 'a') => {
    const refCode = ref.charCodeAt(0);
    const code = string.charCodeAt(index);
    return code - refCode;
  };

  const generateDFA = () => {
    const dfa = Array.from(new Array(R), () => (new Array(M).fill(0)));
    dfa[getCode(pat, 0)][0] = 1;
    for (let x = 0, j = 1; j < M; j += 1) {
      for (let c = 0; c < R; c += 1) {
        dfa[c][j] = dfa[c][x];
      }
      dfa[getCode(pat, j)][j] = j + 1;
      x = dfa[getCode(pat, j)][x];
    }
    return dfa;
  };

  const dfa = generateDFA();
  let i = 0;
  let j = 0;
  while (i < N && j < M) {
    j = dfa[getCode(txt, i)][j];
    i += 1;
  }
  if (j === M) return i - M;
  return N;
};

module.exports = search;

const t = 'abcdefghijklmnopqrstuvwxyz';
const p = 'def';
const i = search(t, p);
console.log(t.slice(i, i + p.length));
