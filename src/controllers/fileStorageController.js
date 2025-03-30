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
exports.uploadPDF = (req, res) => handleFileUpload(req, res, 'pdfs');

exports.uploadTemp = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No se recibió ningún archivo válido'
    });
  }

  res.status(201).json({
    success: true,
    fileName: req.file.filename,
    url: `/temp/${req.file.filename}`,
    message: 'Archivo subido temporalmente'
  });
};

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

exports.deletePDF = async (req, res) => {
  const result = await deleteFile(req.params.fileName, 'pdfs');
  result.success
    ? res.json({ success: true, message: 'PDF eliminado' })
    : res.status(404).json({ success: false, message: 'PDF no encontrado' });
};

const moveFile = async (fileName, targetFolder) => {
  const tempPath = path.join(__dirname, '../../public/temp', fileName);
  const targetPath = path.join(__dirname, `../../public/${targetFolder}`, fileName);

  try {
    await fs.promises.rename(tempPath, targetPath);
    return { success: true, targetPath };
  } catch (error) {
    return { success: false, error };
  }
};

exports.confirmFile = async (req, res) => {
  const { fileName, folder } = req.body;

  if (!fileName || !folder) {
    return res.status(400).json({ success: false, message: 'Faltan parámetros: fileName o folder' });
  }

  const validFolders = ['images', 'videos', 'pdfs'];
  if (!validFolders.includes(folder)) {
    return res.status(400).json({ success: false, message: 'Carpeta no válida' });
  }

  const result = await moveFile(fileName, folder);
  result.success
    ? res.status(200).json({ success: true, message: 'Archivo movido exitosamente', url: `/${folder}/${fileName}` })
    : res.status(500).json({ success: false, message: 'Error al mover el archivo', error: result.error.message });
};