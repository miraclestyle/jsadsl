const getType = (value, objectName = null, objectTemplate = null) => {
  const boolean = () => ('boolean');
  const string = () => ('string');
  const number = (v) => {
    if (v === Infinity) return 'Infinity';
    if (v === -Infinity) return '-Infinity';
    if (Number.isNaN(v)) return 'NaN';
    if (Number.isInteger(v)) return 'integer';
    if (v % 1 !== 0) return 'float';
    return 'number';
  };
  const object = (v) => {
    if (v === null) return 'null';
    if (Array.isArray(v)) return 'array';
    if (objectTemplate !== null) {
      const keys = Object.keys(objectTemplate);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (!(key in v)) return 'object';
        const val = objectTemplate[key];
        const t = getType(v[key], key, val);
        if (t !== key || t !== val) return 'object';
      }
      return objectName;
    }
    return 'object';
  };
  const fun = () => ('function');
  const und = () => ('undefined');
  const types = {
    boolean,
    string,
    number,
    object,
    function: fun,
    undefined: und,
  };
  const type = types[typeof value];
  return type(value);
};

const defaultCompare = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const less = (a, b, compare = defaultCompare) => (compare(a, b) < 0);

const more = (a, b, compare = defaultCompare) => (compare(a, b) > 0);

const equal = (a, b, compare = defaultCompare) => (compare(a, b) === 0);

module.exports = {
  getType,
  defaultCompare,
  less,
  more,
  equal,
};
