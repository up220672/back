const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

// Función genérica para subir archivos
const handleFileUpload = (req, res, folder) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No se recibió ningún archivo válido'
    });
  }

  res.status(201).json({
    success: true,
    fileName: req.file.filename,
    url: `/${folder}/${req.file.filename}`,
    message: 'Archivo subido exitosamente'
  });
};

// Controladores
exports.uploadPhoto = (req, res) => handleFileUpload(req, res, 'images');
exports.uploadVideo = (req, res) => handleFileUpload(req, res, 'videos');

// Función genérica para eliminar
const deleteFile = async (fileName, folder) => {
  const filePath = path.join(__dirname, `../../public/${folder}`, fileName);
  try {
    await unlinkAsync(filePath);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

exports.deletePhoto = async (req, res) => {
  const result = await deleteFile(req.params.fileName, 'images');
  result.success
    ? res.json({ success: true, message: 'Foto eliminada' })
    : res.status(404).json({ success: false, message: 'Foto no encontrada' });
};

exports.deleteVideo = async (req, res) => {
  const result = await deleteFile(req.params.fileName, 'videos');
  result.success
    ? res.json({ success: true, message: 'Video eliminado' })
    : res.status(404).json({ success: false, message: 'Video no encontrado' });
};