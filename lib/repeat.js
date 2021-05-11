const search = (txt, pat, R = 256) => {
  const N = txt.length;
  const M = pat.length;
  const P = 10 ** 7 + 19;
  let B = 1;
  for (let i = 1; i < M; i += 1) {
    B = (B * R) % P;
  }

  const hash = (string) => {
    let h = 0;
    for (let i = 0; i < M; i += 1) {
      h = (h * R + string.charCodeAt(i)) % P;
    }
    return h;
  };

  const patHash = hash(pat);
  let txtHash = hash(txt);
  if (patHash === txtHash) return 0;
  for (let i = M; i < N; i += 1) {
    const remove = (B * txt.charCodeAt(i - M)) % P;
    txtHash = (txtHash + P - remove) % P;
    txtHash = (txtHash * R + txt.charCodeAt(i)) % P;
    if (patHash === txtHash) return i - M + 1;
  }
  return -1;
};

module.exports = search;

const t = 'abcdefghijklmnopqrstuvwxyz';
const p = 'def';
const i = search(t, p);
console.log(i);
console.log(t.slice(i, i + p.length));
