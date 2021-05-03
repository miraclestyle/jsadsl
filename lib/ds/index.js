const { defaultDSType } = require('../config');

const ds = {};

ds.closures = require('./closures');
ds.classes = require('./classes');

module.exports = ds[defaultDSType];
module.exports.Bag = require('./Bag');
module.exports.Stack = require('./Stack');
module.exports.Graph = require('./Graph');
