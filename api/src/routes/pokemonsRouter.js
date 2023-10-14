const { Router } = require("express");
const {
  getAllPokemons,
  findPokemonsByQuery,
  findPokemonById,
  updateOrCreatePokemon,
} = require("../controllers/pokemonsControllers");
const { Pokemon, Type } = require("../db");

const pokemonsRouter = Router();

pokemonsRouter.get("/", async (req, res) => {
  const { name } = req.query;
  let pokemons;

  try {
    if (name) {
      pokemons = await findPokemonsByQuery(name);
      return res.status(200).send(pokemons);
    } else {
      pokemons = await getAllPokemons();
      return res.status(200).send(pokemons);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

pokemonsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await findPokemonById(id);
    res.status(200).send(pokemon);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

pokemonsRouter.post("/", async (req, res) => {
  const { name, health, attack, defense, speed, height, weight, image, types } =
    req.body;
  console.log(types);
  try {
    const newPokemon = await updateOrCreatePokemon({
      name,
      health,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    console.log(newPokemon);
    types.map(async (tipo) => {
      const dbType = await Type.findOrCreate({
        where: {
          name: tipo,
        },
      });
      newPokemon.addType(dbType[0]);
    });
    res.status(200).send(`¡El pokemon ${name} se ha creado correctamente!`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = pokemonsRouter;
