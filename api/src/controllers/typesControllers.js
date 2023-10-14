const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const types = await axios.get("https://pokeapi.co/api/v2/type");

  const allTypes = types.data;

  const res = allTypes.results.map((elem) => {
    return parseInt(elem.url.split("/")[6]);
  });

  const result = await Promise.all(
    res.map(async (elem) => {
      return await getDetailedTypes(elem);
    })
  );

  let dataBaseInfo = await Type.findOne({
    where: { name: "normal" },
  });

  if (!dataBaseInfo) {
    result.forEach((elem) => {
      Type.create({
        name: elem.name,
      });
    });
  }

  return result;
};

const getDetailedTypes = async (id) => {
  const types = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
  const allTypes = types.data;

  const dataTypes = {
    name: allTypes.name,
  };

  return dataTypes;
};

const getDbInfo = async () => {
  return await Type.findAll();
};

const getAllTypes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();

  return dbInfo;
};

module.exports = {
  getAllTypes,
  getDbInfo,
};
