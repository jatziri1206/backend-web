const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('./routes/usuario.routes.js')(app);
require('./routes/materia.routes.js')(app); // Asegúrate de incluir esta línea
require('./routes/grupo.routes.js')(app);
require('./routes/asistencia.routes.js')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
