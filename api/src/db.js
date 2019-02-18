const Mongoose = require("mongoose");
const config = require("./config");
let db;
db = Mongoose.connect(config.dburl, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(err);
    console.log("Exiting process...");
    process.exit(1);
  }
});

module.exports = db;
