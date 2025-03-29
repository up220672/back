// Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importar cors
const connectDB = require('./src/config/database');
const routes = require('./src/routes/index');
const swaggerMiddleware = require('./src/middleware/swagger');
const errorHandler = require('./src/middleware/errorHandler');
const path = require('path');

// Importar las rutas de almacenamiento de archivos
const fileStorageRoutes = require('./src/routes/fileStorageRoute');

const app = express();
let port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

// Connect to the database
connectDB();

// Middleware para habilitar CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json({ limit: '50mb' }));

// Servir archivos estáticos desde la carpeta "public"
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/videos', express.static(path.join(__dirname, 'public/videos')));
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));

app.get('/', (req, res) => {
  res.send('Welcome to the holi API');
});

// Use the routes defined in the index file
app.use('/api', routes);

// Middleware para las rutas de almacenamiento de archivos
app.use('/api/files', fileStorageRoutes);

// Swagger integration
swaggerMiddleware(app);

// Error handler middleware integration
app.use(errorHandler);

// Start the server
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log(`Server listening on: http://localhost:${process.env.PORT || 3000}`);
});
