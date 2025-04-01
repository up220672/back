const PropertyDraft = require('../models/drafts').PropertyDraft;
const Property = require('../models/property').Property;
const fs = require('fs');
const path = require('path');

// Lista de campos que no deben ser actualizados
const IMMUTABLE_FIELDS = [
  'is_active',
  'views',
  'is_approved',
  'created_at',
  'updated_at',
  '_id',
  'reviews',
];

// Función para eliminar archivos que ya no están en el borrador
// Función para eliminar archivos que ya no están en el borrador
const deleteRemovedFiles = async (originalFiles, draftFiles, folder) => {
    // Normalizar los arrays para trabajar siempre con nombres de archivo
    const normalizeFiles = (files) => {
      return files.map(file => {
        if (typeof file === 'string') return file;
        if (file.url) return file.url.split('/').pop(); // Extraer nombre del archivo de la URL
        if (file.fileName) return file.fileName;
        return null;
      }).filter(Boolean); // Filtrar valores nulos
    };
  
    const normalizedOriginal = normalizeFiles(originalFiles);
    const normalizedDraft = normalizeFiles(draftFiles);
  
    // Encontrar archivos a eliminar
    const filesToDelete = normalizedOriginal.filter(file => 
      !normalizedDraft.includes(file)
    );
  
    // Eliminar archivos físicos
    for (const file of filesToDelete) {
      const filePath = path.join(__dirname, `../../public/${folder}`, file);
      try {
        await fs.promises.unlink(filePath);
        console.log(`Archivo eliminado: ${filePath}`);
      } catch (error) {
        // No lanzar error si el archivo no existe
        if (error.code !== 'ENOENT') {
          console.error(`Error al eliminar el archivo ${filePath}:`, error.message);
        }
      }
    }
  };
  
  // Función para manejar fotos y videos de entidades secundarias
  const handleSecondaryEntities = async (originalEntities, draftEntities, folder) => {
    const extractFileNames = (entities) => {
      const files = [];
      entities.forEach(entity => {
        if (entity.photos) {
          entity.photos.forEach(photo => {
            if (photo.fileName) files.push(photo.fileName);
            else if (typeof photo === 'string') files.push(photo);
          });
        }
        if (entity.videos) {
          entity.videos.forEach(video => {
            if (video.fileName) files.push(video.fileName);
            else if (typeof video === 'string') files.push(video);
          });
        }
      });
      return files;
    };
  
    const originalFiles = extractFileNames(originalEntities);
    const draftFiles = extractFileNames(draftEntities);
  
    await deleteRemovedFiles(originalFiles, draftFiles, folder);
  };

// Crear un borrador vacío
exports.createEmptyPropertyDraft = async (req, res) => {
  try {
    const draft = new PropertyDraft({
      original_property_id: null,
      draft_data: req.body.draft_data,
      user: req.body.user,
    });

    await draft.save();
    res.status(201).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Actualizar un borrador existente
exports.updatePropertyDraft = async (req, res) => {
  try {
    const draft = await PropertyDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    draft.draft_data = { ...draft.draft_data, ...req.body.draft_data };
    draft.updated_at = Date.now();
    await draft.save();

    res.status(200).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Crear un borrador a partir de una propiedad guardada
exports.createPropertyDraftFromSavedProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const draft = new PropertyDraft({
      original_property_id: property._id,
      draft_data: property.toObject(), // Copiar los datos de la propiedad
      user: req.user.id, // Asignar el usuario autenticado
    });

    await draft.save();
    res.status(201).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Guardar un borrador en una propiedad existente
exports.savePropertyDraftIntoProperty = async (req, res) => {
  try {
    const draft = await PropertyDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    if (!draft.original_property_id) {
      return res.status(400).json({ success: false, message: 'Draft is not linked to an existing property' });
    }

    // Obtener la propiedad original
    const originalProperty = await Property.findById(draft.original_property_id);
    if (!originalProperty) {
      return res.status(404).json({ success: false, message: 'Original property not found' });
    }

    // Manejar fotos y videos de las entidades secundarias
    // await handleSecondaryEntities(originalProperty.bedrooms || [], draft.draft_data.bedrooms || [], 'images');
    // await handleSecondaryEntities(originalProperty.bathrooms || [], draft.draft_data.bathrooms || [], 'images');
    // await handleSecondaryEntities(originalProperty.kitchens || [], draft.draft_data.kitchens || [], 'images');

    // Eliminar archivos que ya no están en el borrador
    // En savePropertyDraftIntoProperty
    // await deleteRemovedFiles(
    //     originalProperty.photos || [], 
    //     Array.isArray(draft.draft_data.photos) ? draft.draft_data.photos : [],
    //     'images'
    // );
    
    // await deleteRemovedFiles(
    //     originalProperty.videos || [], 
    //     Array.isArray(draft.draft_data.videos) ? draft.draft_data.videos : [],
    //     'videos'
    // );
    
    // await deleteRemovedFiles(
    //     originalProperty.pdfs || [], 
    //     Array.isArray(draft.draft_data.pdfs) ? draft.draft_data.pdfs : [],
    //     'pdfs'
    // );
    
    // Filtrar los campos inmutables
    const filteredDraftData = { ...draft.draft_data };
    IMMUTABLE_FIELDS.forEach((field) => delete filteredDraftData[field]);

    // Actualizar la propiedad original con los datos filtrados
    const property = await Property.findByIdAndUpdate(
      draft.original_property_id,
      filteredDraftData,
      { new: true }
    );

    // Eliminar el borrador después de guardar
    await PropertyDraft.findByIdAndDelete(draft._id);

    res.status(200).json({ success: true, property });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.savePropertyDraftIntoNewProperty = async (req, res) => {
  try {
    const draft = await PropertyDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    // Extraer correctamente los datos del borrador
    const draftData = draft.draft_data.toObject ? draft.draft_data.toObject() : draft.draft_data;

    // Eliminar campos internos de Mongoose que no queremos guardar
    delete draftData._id;
    delete draftData.__v;
    delete draftData.$__;
    delete draftData.$isNew;

    // Si hay subdocumentos como address, también necesitamos limpiarlos
    if (draftData.address) {
      delete draftData.address._id;
    }

    // Limpiar IDs de subdocumentos en amenities
    if (draftData.amenities) {
      delete draftData.amenities._id;
    }

    // Crear una nueva propiedad con los datos limpios del borrador
    const property = new Property(draftData);
    await property.save();

    // Eliminar el borrador después de guardar
    await PropertyDraft.findByIdAndDelete(draft._id);

    res.status(201).json({ 
      success: true, 
      property,
      propertyId: property._id // Asegúrate de devolver el ID de la nueva propiedad
    });
  } catch (error) {
    console.error('Error saving draft to new property:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Obtener o crear un borrador para una propiedad
exports.getOrCreateDraft = async (req, res) => {
  try {
    const { property_id } = req.params;

    // Verificar si ya existe un borrador para la propiedad
    let draft = await PropertyDraft.findOne({ original_property_id: property_id });

    if (draft) {
      // Si ya existe un borrador, devolverlo
      return res.status(200).json({ success: true, draft, isNew: false });
    }

    // Si no existe un borrador, buscar la propiedad original
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    console.log('Creating new draft for property:', property_id);
    console.log('Con el usuario: ', req.user.id);

    // Crear un nuevo borrador basado en la propiedad original
    draft = new PropertyDraft({
      original_property_id: property._id,
      draft_data: property.toObject(), // Copiar los datos de la propiedad
      user: req.user.id, // Asignar el usuario autenticado
    });

    await draft.save();

    // Devolver el borrador recién creado, incluyendo su ID
    res.status(201).json({ success: true, draft, isNew: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Descartar los cambios de un borrador y volver a cargar los datos de la propiedad original
exports.discardDraftChanges = async (req, res) => {
  try {
    const draft = await PropertyDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    // Verificar que el usuario autenticado sea el propietario del borrador
    if (!draft.user.equals(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    if (!draft.original_property_id) {
      return res.status(400).json({ success: false, message: 'Draft is not linked to an original property' });
    }

    const originalProperty = await Property.findById(draft.original_property_id);
    if (!originalProperty) {
      return res.status(404).json({ success: false, message: 'Original property not found' });
    }

    draft.draft_data = originalProperty.toObject();
    draft.updated_at = Date.now();
    await draft.save();

    res.status(200).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getDraftById = async (req, res) => {
  try {
    const draft = await PropertyDraft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    res.status(200).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Agregar URL de imagen o video al borrador
exports.addImageOrVideoToDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, url } = req.body; // Recibir la URL desde el cuerpo de la solicitud

    const draft = await PropertyDraft.findById(id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    if (type === 'image') {
      draft.draft_data.photos.push({ url });
    } else if (type === 'video') {
      draft.draft_data.videos.push({ url });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid file type' });
    }

    await draft.save();
    res.status(200).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar URL de imagen o video del borrador
exports.deleteImageOrVideoFromDraft = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, url } = req.body; // Recibir la URL desde el cuerpo de la solicitud

    const draft = await PropertyDraft.findById(id);
    if (!draft) {
      return res.status(404).json({ success: false, message: 'Draft not found' });
    }

    if (type === 'image') {
      draft.draft_data.photos = draft.draft_data.photos.filter(photo => photo.url !== url);
    } else if (type === 'video') {
      draft.draft_data.videos = draft.draft_data.videos.filter(video => video.url !== url);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid file type' });
    }

    await draft.save();
    res.status(200).json({ success: true, draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllDraftsByUser = async (req, res) => {
  try {
    const drafts = await PropertyDraft.find({ user: req.user.id });
    res.status(200).json({ success: true, drafts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getDraftsNotInReviewByUser = async (req, res) => {
  try {
    const drafts = await PropertyDraft.find({ user: req.user.id, is_in_review: false });
    res.status(200).json({ success: true, drafts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getDraftsInReviewByUser = async (req, res) => {
  try {
    const drafts = await PropertyDraft.find({ user: req.user.id, is_in_review: true });
    res.status(200).json({ success: true, drafts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};