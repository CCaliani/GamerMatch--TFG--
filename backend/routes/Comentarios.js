// Rutas para la gestión de comentarios en la plataforma.

import express from 'express';
import Comentario from '../models/Comentario.js';

const router = express.Router();

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Obtiene todos los comentarios
 *     tags: [Comentarios]
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *   post:
 *     summary: Crea un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *               texto:
 *                 type: string
 *               puntuacion:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todos los comentarios
router.get('/', async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.json(comentarios);
  } catch {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// Crear un nuevo comentario
router.post('/', async (req, res) => {
  try {
    const { usuario, texto, puntuacion } = req.body;
    if (!usuario || !texto || !puntuacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: 'La puntuación debe estar entre 1 y 5' });
    }
    const comentario = await Comentario.create({ usuario, texto, puntuacion });
    res.status(201).json(comentario);
  } catch {
    res.status(500).json({ error: 'Error al crear comentario' });
  }
});
export default router;
