const hashUndefined = () => (0);

const hashNull = () => (0);

const hashBoolean = (value) => (value ? 1231 : 1237);

const hashInteger = (value) => (value);

const hashFloat = (value) => (value);

// Horner's method
const hashString = (value) => {
  const n = value.length;
  let hash = 0;
  for (let i = 0; i < n; i += 1) {
    const code = value.charCodeAt(i);
    hash = code + (31 * hash);
  }
  return hash;
};

module.exports = {
  hashUndefined,
  hashNull,
  hashBoolean,
  hashInteger,
  hashFloat,
  hashString,
};
