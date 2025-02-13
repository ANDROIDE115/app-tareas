const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let tareas = [];
let server;

// Función para buscar una tarea por ID
const findTareaById = (id) => {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) throw { status: 404, message: 'Tarea no encontrada' };
  return tarea;
};

// Ruta principal
app.get('/', (req, res) => {
  res.send('API To-Do List');
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const { titulo, descripcion } = req.body;
  
  if (!titulo?.trim()) {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const nuevaTarea = {
    id: uuidv4(),
    titulo: titulo.trim(),
    descripcion: descripcion?.trim() || '',
    completado: false
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Obtener todas las tareas (con opción de filtrar por estado)
app.get('/tareas', (req, res) => {
  const { completado } = req.query;
  let resultado = tareas;

  if (completado !== undefined) {
    resultado = tareas.filter(t => t.completado === (completado === 'true'));
  }

  res.json(resultado);
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
  try {
    const tarea = findTareaById(req.params.id);
    res.json(tarea);
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

// Actualizar una tarea por ID
app.patch('/tareas/:id', (req, res) => {
  try {
    const tarea = findTareaById(req.params.id);
    const updates = req.body;

    const allowedUpdates = ['titulo', 'descripcion', 'completado'];
    const isValidUpdate = Object.keys(updates).every(key => allowedUpdates.includes(key));
    
    if (!isValidUpdate) {
      return res.status(400).json({ error: 'Campos de actualización inválidos' });
    }

    if (updates.titulo !== undefined) {
      if (!updates.titulo.trim()) throw { status: 400, message: 'El título no puede estar vacío' };
      tarea.titulo = updates.titulo.trim();
    }
    
    if (updates.descripcion !== undefined) tarea.descripcion = updates.descripcion?.trim() || '';
    if (updates.completado !== undefined) tarea.completado = Boolean(updates.completado);

    res.json(tarea);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
  try {
    const index = tareas.findIndex(t => t.id === req.params.id);
    if (index === -1) throw { status: 404, message: 'Tarea no encontrada' };
    
    tareas.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
});

// Middleware para manejar errores inesperados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor si es ejecutado directamente
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
} else {
  server = { close: (callback) => callback() };
}

module.exports = { app, server, tareas, findTareaById };
