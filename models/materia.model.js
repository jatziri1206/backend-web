const sql = require("./db.js");

const Materia = function(materia) {
  this.nombre = materia.nombre;
  this.descripcion = materia.descripcion;
};

Materia.create = (newMateria, result) => {
  sql.query("INSERT INTO materias SET ?", newMateria, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newMateria });
  });
};

Materia.getAll = result => {
  sql.query("SELECT * FROM materias", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Materia;
