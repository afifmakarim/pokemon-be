var express = require("express");
var router = express.Router();
const apiControllers = require("../controllers/apiControllers");

router.get("/favorite", apiControllers.favoritePokemon);
router.post("/catch", apiControllers.addPokemon);
router.delete("/release", apiControllers.releasePokemon);
router.put("/rename", apiControllers.renamePokemon);

module.exports = router;
