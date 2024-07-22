import express from 'express';
import payload from 'payload';
import cors from 'cors';

require('dotenv').config();
const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite solicitudes desde tu frontend
  optionsSuccessStatus: 200,
  credentials: true, // Permite el uso de cookies
}));

// Middleware para parsear JSON
app.use(express.json());

// Redireccionar root al panel de administración
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Inicializar Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Ruta personalizada para buscar personas por cédula
  app.get('/api/personas/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const personas = await payload.find({
        collection: 'personas',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });
      res.status(200).json(personas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta personalizada para buscar membresías por cédula
  app.get('/api/membresias/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const membresias = await payload.find({
        collection: 'membresias',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });
      res.status(200).json(membresias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta para editar una persona por cédula
  app.patch('/api/personas/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const personas = await payload.find({
        collection: 'personas',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });

      if (personas.totalDocs === 0) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }

      const updatedPersona = await payload.update({
        collection: 'personas',
        id: personas.docs[0].id,
        data: req.body,
      });
      res.status(200).json(updatedPersona);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta para eliminar una persona por cédula
  app.delete('/api/personas/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const personas = await payload.find({
        collection: 'personas',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });

      if (personas.totalDocs === 0) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }

      await payload.delete({
        collection: 'personas',
        id: personas.docs[0].id,
      });
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta para editar una membresía por cédula
  app.patch('/api/membresias/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const membresias = await payload.find({
        collection: 'membresias',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });

      if (membresias.totalDocs === 0) {
        return res.status(404).json({ error: 'Membresía no encontrada' });
      }

      const updatedMembresia = await payload.update({
        collection: 'membresias',
        id: membresias.docs[0].id,
        data: req.body,
      });
      res.status(200).json(updatedMembresia);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Ruta para eliminar una membresía por cédula
  app.delete('/api/membresias/cedula/:cedula', async (req, res) => {
    try {
      const cedula = req.params.cedula;
      const membresias = await payload.find({
        collection: 'membresias',
        where: {
          cedula: {
            equals: cedula,
          },
        },
      });

      if (membresias.totalDocs === 0) {
        return res.status(404).json({ error: 'Membresía no encontrada' });
      }

      await payload.delete({
        collection: 'membresias',
        id: membresias.docs[0].id,
      });
      res.status(204).send(); // No Content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
};

start();
