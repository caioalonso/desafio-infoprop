const Mongoose = require('mongoose');
const config = require('./config');
let db = Mongoose.connect(config.dburl, {useNewUrlParser: true});
module.exports = db;