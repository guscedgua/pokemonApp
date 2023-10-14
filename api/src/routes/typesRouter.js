const { Router } = require("express");
const { getAllTypes, getDbInfo } = require("../controllers/typesControllers");
const typesRouter = Router();

typesRouter.get("/", async (req, res) => {
  try {
    getDbInfo();
    const types = await getAllTypes();
    return res.status(200).send(types);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = typesRouter;
