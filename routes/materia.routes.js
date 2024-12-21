module.exports = app => {
  const materias = require("../controllers/materia.controller.js");

  app.post("/api/materias", materias.create);
  app.get("/api/materias", materias.findAll);
};
