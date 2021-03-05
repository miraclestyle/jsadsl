const { defaultDSType } = require('../config');

const ds = {};

ds.closures = require('./closures');
ds.classes = require('./classes');

module.exports = ds[defaultDSType];
