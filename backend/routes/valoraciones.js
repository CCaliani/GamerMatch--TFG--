// Rutas para la gestión de las valoraciones en la plataforma.

const express = require('express');
const router = express.Router();
const Valoracion = require('../models/Valoracion');

/**
 * @swagger
 * /api/valoraciones:
 *   get:
 *     summary: Obtiene todas las valoraciones de un usuario
 *     tags: [Valoraciones]
 *     parameters:
 *       - name: usuarioValoradoId
 *         in: query
 *         required: true
 *         description: ID del usuario valorado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de valoraciones
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crea una nueva valoración
 *     tags: [Valoraciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: integer
 *               usuarioValoradorId:
 *                 type: integer
 *               usuarioValoradoId:
 *                 type: integer
 *               puntuacion:
 *                 type: integer
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Valoración creada
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todas las valoraciones de un usuario
router.get('/', async (req, res) => {
  try {
    const { usuarioValoradoId } = req.query;
    if (!usuarioValoradoId) return res.status(400).json({ error: 'usuarioValoradoId es requerido' });
    const valoraciones = await Valoracion.findAll({ where: { usuarioValoradoId }, order: [['fecha', 'DESC']] });
    res.json(valoraciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener valoraciones' });
  }
});

// Crear una nueva valoración
router.post('/', async (req, res) => {
  try {
    const { matchId, usuarioValoradorId, usuarioValoradoId, puntuacion, comentario } = req.body;
    if (!matchId || !usuarioValoradorId || !usuarioValoradoId || !puntuacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: 'La puntuación debe estar entre 1 y 5' });
    }
    const valoracion = await Valoracion.create({ matchId, usuarioValoradorId, usuarioValoradoId, puntuacion, comentario });
    res.status(201).json(valoracion);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear valoración' });
  }
});

module.exports = router;
