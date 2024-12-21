const sql = require("./db.js");

const Grupo = function(grupo) {
  this.nombre = grupo.nombre;
  this.descripcion = grupo.descripcion;
  this.nombreProfesor = grupo.nombreProfesor;
  this.idmateria = grupo.idmateria;
};

Grupo.create = (newGrupo, result) => {
  sql.query("INSERT INTO grupos SET ?", newGrupo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newGrupo });
  });
};

Grupo.getAll = result => {
  sql.query(`
    SELECT grupos.*, materias.nombre AS materia_nombre 
    FROM grupos 
    LEFT JOIN materias ON grupos.idmateria = materias.id
  `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Añadir alumnos al grupo
Grupo.addAlumno = (grupoId, alumnoId, result) => {
  sql.query("INSERT INTO grupo_alumnos (grupo_id, alumno_id) VALUES (?, ?)", [grupoId, alumnoId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Grupo.getAlumnos = (grupoId, result) => {
  sql.query("SELECT usuarios.* FROM usuarios INNER JOIN grupo_alumnos ON usuarios.id = grupo_alumnos.alumno_id WHERE grupo_alumnos.grupo_id = ?", [grupoId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Grupo;
