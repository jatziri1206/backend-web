const sql = require("./db.js");

// constructor
const Asistencia = function(asistencia) {
  this.nocontrol = asistencia.nocontrol;
  this.idgrupo = asistencia.idgrupo;
  this.fecha = asistencia.fecha;
};

Asistencia.create = (newAsistencia, result) => {
  sql.query("INSERT INTO asistencia SET ?", newAsistencia, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newAsistencia });
  });
};

Asistencia.getAll = result => {
  sql.query("SELECT * FROM asistencia", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Asistencia;
