module.exports = app => {
    const asistencias = require("../controllers/asistencia.controller.js");
  
    app.post("/api/asistencias", asistencias.create);
    app.get("/api/asistencias", asistencias.findAll);
  };
  