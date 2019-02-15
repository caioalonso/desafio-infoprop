const Mongoose = require("mongoose");

const schema = new Mongoose.Schema({
  date: String,
  rua: String,
  numero: String,
  bairro: String,
  condominio: String,
  price: String,
  area: String,
  price_by_sqm: String,
  condominium_fee: String,
  iptu: String,
  rooms: String,
  bathrooms: String,
  garage: String,
  agent: String,
  agent_number: String,
  property_d: String,
  url: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

module.exports = Mongoose.model("Properties", schema);
