const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
  pokemon_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  links: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
