// (a + b) % Q === ((a % Q) + (b % Q)) % Q
// (a * b) % Q === ((a % Q) * (b % Q)) % Q
const search = (txt, pat) => {
  const N = txt.length;
  const M = pat.length;
  const R = 256;
  const PRIME = 997;
  let BASE = 1;
  for (let i = 1; i < M; i += 1) {
    BASE = (BASE * R) % PRIME;
  }

  const hash = (string) => {
    let h = 0;
    for (let i = 0; i < M; i += 1) {
      h = (h * R + string.charCodeAt(i)) % PRIME;
    }
    return h;
  };

  const patHash = hash(pat);
  let txtHash = hash(txt);
  if (patHash === txtHash) return 0;
  for (let i = M; i < N; i += 1) {
    txtHash = (txtHash + PRIME - ((BASE * txt.charCodeAt(i - M)) % PRIME)) % PRIME;
    txtHash = (txtHash * R + txt.charCodeAt(i)) % PRIME;
    if (patHash === txtHash) return i - M + 1;
  }
  return N;
};

module.exports = search;

const t = 'abcdefghijklmnopqrstuvwxyz';
const p = 'def';
const i = search(t, p);
console.log(t.slice(i, i + p.length));
