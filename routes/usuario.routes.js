module.exports = app => {
    const usuarios = require("../controllers/usuario.controller.js");
  
    app.post("/api/usuarios", usuarios.create);
    app.post("/api/login", usuarios.login);
    app.get("/api/usuarios", usuarios.findAll);
  };
  