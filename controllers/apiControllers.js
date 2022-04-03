const Pokemon = require("../models/pokemon.model");
const checkPrimeNumber = require("../utils/checkPrimeNumber");

module.exports = {
  favoritePokemon: async (req, res) => {
    try {
      const PokemonList = await Pokemon.find();
      if (!PokemonList) {
        return res
          .status(404)
          .json({ status: "05", message: "Cant find data" });
      }
      return res
        .status(200)
        .json({ status: "00", message: "success", data: PokemonList });
    } catch (error) {
      console.log(error);
    }
  },

  addPokemon: async (req, res) => {
    try {
      const { name, imageUrl, links, pokemon_id } = req.body;
      const decision = Math.floor(Math.random() * 2);
      const getPokemonId = await Pokemon.findOne({ pokemon_id: pokemon_id });
      if (getPokemonId) {
        return res
          .status(200)
          .json({ status: "07", message: "Already Got The Pokemon" });
      }
      if (decision !== 1) {
        return res
          .status(200)
          .json({ status: "05", message: "Pokemon Run Away!!" });
      }

      await Pokemon.create({ name, imageUrl, links, pokemon_id });
      return res.status(200).json({ status: "00", message: "Gotcha!" });
    } catch (error) {
      return res.status(200).json({ status: "06", message: "API Failed" });
    }
  },

  releasePokemon: async (req, res) => {
    try {
      const { name } = req.body;
      const decision = Math.floor(Math.random() * 100);
      if (checkPrimeNumber(decision) !== true) {
        res.status(200).json({ message: "Failed to release!" });
      }
      const release = await Pokemon.findOne({ name });
      await release.remove();
      res.status(200).json({ message: "Say goodbye to your pokemon" });
    } catch (error) {
      console.log(error);
    }
  },

  renamePokemon: async (req, res) => {
    try {
      const { pokemon_id, newName } = req.body;
      const ownedPokemon = await Pokemon.findOne({ pokemon_id });
      const oldName = ownedPokemon.name;
      const splitString = oldName.split("-");
      let newUpdateName;

      // fibb formula
      if (splitString[1] == null) {
        newUpdateName = newName + `-` + 0;
      }

      const number = +splitString[1];
      let n1 = 0,
        n2 = 1,
        nextTerm;

      nextTerm = n1 + n2;

      while (nextTerm <= number) {
        n1 = n2;
        n2 = nextTerm;
        nextTerm = n1 + n2;
      }
      newUpdateName = newName + `-` + nextTerm;

      const commitUpdate = await Pokemon.findOneAndUpdate(
        { pokemon_id },
        {
          name: newUpdateName,
        }
      );
      res.status(200).json({ status: "00", message: commitUpdate });
    } catch (error) {
      console.log(error);
    }
  },
};
