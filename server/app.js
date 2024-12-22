const express = require('express');
const cors = require('cors');
const app = express();
const countryRoutes = require('./routes/countryRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const municipalityRoutes = require('./routes/municipalityRoutes');
const companyRoutes = require('./routes/companyRoutes');
const collaboratorRoutes = require('./routes/collaboratorRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/countries', countryRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/municipalities', municipalityRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/collaborators', collaboratorRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
