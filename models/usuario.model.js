const sql = require("./db.js");

const Usuario = function(usuario) {
  this.nocontrol = usuario.nocontrol;
  this.nombre = usuario.nombre;
  this.apellidos = usuario.apellidos;
  this.telefono = usuario.telefono;
  this.email = usuario.email;
  this.password = usuario.password;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findByNocontrol = (nocontrol, result) => {
  sql.query("SELECT * FROM usuarios WHERE nocontrol = ?", [nocontrol], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = result => {
  sql.query("SELECT * FROM usuarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Usuario;
