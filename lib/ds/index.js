const closures = require('./closures');
const classes = require('./classes');
const { useClosures } = require('../config');

module.exports = useClosures ? closures : classes;
