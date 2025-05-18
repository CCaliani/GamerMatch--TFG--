const express = require('express');
const router = express.Router();
const Mensaje = require('../models/Mensaje');

/**
 * @swagger
 * /api/mensajes:
 *   get:
 *     summary: Obtiene todos los mensajes de un match
 *     tags: [Mensajes]
 *     parameters:
 *       - name: matchId
 *         in: query
 *         required: true
 *         description: ID del match
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crea un nuevo mensaje
 *     tags: [Mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matchId:
 *                 type: integer
 *               usuarioId:
 *                 type: integer
 *               texto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje creado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todos los mensajes de un match
router.get('/', async (req, res) => {
  try {
    const { matchId } = req.query;
    if (!matchId) return res.status(400).json({ error: 'matchId es requerido' });
    const mensajes = await Mensaje.findAll({ where: { matchId }, order: [['timestamp', 'ASC']] });
    res.json(mensajes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Crear un nuevo mensaje
router.post('/', async (req, res) => {
  try {
    const { matchId, usuarioId, texto } = req.body;
    if (!matchId || !usuarioId || !texto) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (texto.length > 1000) {
      return res.status(400).json({ error: 'El mensaje es demasiado largo' });
    }
    const mensaje = await Mensaje.create({ matchId, usuarioId, texto });
    res.status(201).json(mensaje);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear mensaje' });
  }
});

module.exports = router;
