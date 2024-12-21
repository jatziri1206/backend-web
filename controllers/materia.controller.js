const Materia = require("../models/materia.model.js");

// Crear una nueva materia
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const materia = new Materia({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });

  Materia.create(materia, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Materia."
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener todas las materias
exports.findAll = (req, res) => {
  Materia.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving materias."
      });
    } else {
      res.send(data);
    }
  });
};
