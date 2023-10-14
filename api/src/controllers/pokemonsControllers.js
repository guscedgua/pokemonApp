const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
  );

  const allPokemons = pokemons.data;

  const res = allPokemons.results.map((elem) => {
    return parseInt(elem.url.split("/")[6]);
  });

  const result = await Promise.all(
    res.map(async (elem) => {
      return await getDetailedPokemons(elem);
    })
  );

  return result;
};

const getDetailedPokemons = async (id) => {
  const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const allPokemons = pokemons.data;

  const dataPokemons = {
    id: allPokemons.id,
    name: allPokemons.name,
    health: allPokemons.stats[0].base_stat,
    attack: allPokemons.stats[1].base_stat,
    defense: allPokemons.stats[2].base_stat,
    speed: allPokemons.stats[5].base_stat,
    height: allPokemons.height,
    weight: allPokemons.weight,
    types: allPokemons.types.map((elem) => elem.type.name),
    image: allPokemons.sprites.front_default,
  };

  return dataPokemons;
};

const filterPokemonDb = (pokemon) => {
  const newTypes = [];
  pokemon.types.forEach((element) => newTypes.push(element["name"]));
  pokemon["types"] = newTypes;
  return pokemon;
};

const getDbInfo = async () => {
  const arrPoke = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  var pokeFiltered = arrPoke.map((elem) => elem.dataValues);

  return pokeFiltered.map((elem) => filterPokemonDb(elem));
};

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

const findPokemonsByQuery = async (name) => {
  const pokemons = await getAllPokemons();

  let result = await pokemons.filter(
    (elem) => elem.name.toLowerCase() === name.toLowerCase()
  );

  if (result.length === 0) throw Error(`El pokemon ${name} no existe`);
  else return result;
};

const findPokemonById = async (id) => {
  const pokemons = await getAllPokemons();

  let result = await pokemons.filter((elem) => elem.id == id);

  if (result.length === 0) throw Error(`El pokemon con el ID ${id} no existe`);
  else return result;
};

const updateOrCreatePokemon = async (newPokemon) => {
  const alreadyHave = await Pokemon.findOne({
    where: { name: newPokemon.name.toLowerCase() },
  });
  if (alreadyHave) {
    throw Error(`El pokemon ${newPokemon.name} ya existe`);
  } else {
    const pokeDb = await Pokemon.create({
      name: newPokemon.name.toLowerCase(),
      health: newPokemon.health,
      attack: newPokemon.attack,
      defense: newPokemon.defense,
      speed: newPokemon.speed,
      height: newPokemon.height,
      weight: newPokemon.weight,
      image: newPokemon.image,
    });
    return pokeDb;
  }
};

module.exports = {
  getAllPokemons,
  findPokemonsByQuery,
  findPokemonById,
  updateOrCreatePokemon,
};
