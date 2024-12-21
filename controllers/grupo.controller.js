const Grupo = require("../models/grupo.model.js");

// Crear un nuevo grupo
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const grupo = new Grupo({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    nombreProfesor: req.body.nombreProfesor,
    idmateria: req.body.idmateria
  });

  Grupo.create(grupo, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Grupo."
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener todos los grupos
exports.findAll = (req, res) => {
  Grupo.getAll((err, grupos) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving grupos."
      });
    } else {
      // Obtener los alumnos para cada grupo
      const gruposWithAlumnosPromises = grupos.map(grupo => {
        return new Promise((resolve, reject) => {
          Grupo.getAlumnos(grupo.id, (err, alumnos) => {
            if (err) {
              reject(err);
            } else {
              grupo.alumnos = alumnos;
              resolve(grupo);
            }
          });
        });
      });

      Promise.all(gruposWithAlumnosPromises)
        .then(gruposWithAlumnos => res.send(gruposWithAlumnos))
        .catch(err => res.status(500).send({
          message: err.message || "Some error occurred while retrieving alumnos for the grupos."
        }));
    }
  });
};

// Añadir alumno a un grupo
exports.addAlumno = (req, res) => {
  Grupo.addAlumno(req.body.grupoId, req.body.alumnoId, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while adding the alumno to the Grupo."
      });
    } else {
      res.send(data);
    }
  });
};

// Obtener alumnos de un grupo
exports.getAlumnos = (req, res) => {
  Grupo.getAlumnos(req.params.grupoId, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving alumnos from the Grupo."
      });
    } else {
      res.send(data);
    }
  });
};
