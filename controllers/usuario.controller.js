const Usuario = require("../models/usuario.model.js");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const usuario = new Usuario({
    nocontrol: req.body.nocontrol,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    telefono: req.body.telefono,
    email: req.body.email,
    password: req.body.password
  });

  Usuario.create(usuario, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Usuario."
      });
    } else {
      res.send(data);
    }
  });
};

exports.login = (req, res) => {
  const { nocontrol, password } = req.body;

  Usuario.findByNocontrol(nocontrol, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: `Not found Usuario with nocontrol ${nocontrol}.`
        });
      } else {
        return res.status(500).send({
          message: "Error retrieving Usuario with nocontrol " + nocontrol
        });
      }
    } else {
      if (password !== data.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: data.id }, "secret-key", {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: data.id,
        nocontrol: data.nocontrol,
        nombre: data.nombre,
        accessToken: token
      });
    }
  });
};

exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving usuarios."
      });
    } else {
      res.send(data);
    }
  });
};
