module.exports = app => {
    const grupos = require("../controllers/grupo.controller.js");
  
    app.post("/api/grupos", grupos.create);
    app.get("/api/grupos", grupos.findAll);
    app.post("/api/grupos/alumnos", grupos.addAlumno); // Añadir esta línea
    app.get("/api/grupos/:grupoId/alumnos", grupos.getAlumnos); // Añadir esta línea
  };
  