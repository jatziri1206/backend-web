const Asistencia = require("../models/asistencia.model.js");

// Crear una nueva asistencia
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Crear una asistencia
  const asistencia = new Asistencia({
    nocontrol: req.body.nocontrol,
    idgrupo: req.body.idgrupo,
    fecha: req.body.fecha
  });

  // Guardar asistencia en la base de datos
  Asistencia.create(asistencia, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Asistencia."
      });
    else res.send(data);
  });
};

// Obtener todas las asistencias
exports.findAll = (req, res) => {
  Asistencia.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving asistencias."
      });
    else res.send(data);
  });
};
