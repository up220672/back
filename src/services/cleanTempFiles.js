const fs = require('fs');
const path = require('path');

const TEMP_FOLDER = path.join(__dirname, '../../public/temp');
const ONE_HOUR = 60 * 60 * 1000;

const cleanTempFiles = () => {
  fs.readdir(TEMP_FOLDER, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta temporal:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(TEMP_FOLDER, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error al obtener información del archivo:', err);
          return;
        }

        const now = Date.now();
        const fileAge = now - stats.mtimeMs;

        if (fileAge > ONE_HOUR) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error al eliminar archivo temporal:', err);
            } else {
              console.log(`Archivo eliminado: ${file}`);
            }
          });
        }
      });
    });
  });
};

module.exports = cleanTempFiles;