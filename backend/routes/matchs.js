const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const { Op } = require('sequelize');


/**
 * @swagger
 * /api/matchs:
 *   get:
 *     summary: Obtiene todos los matchs
 *     tags: [Matchs]
 *     responses:
 *       200:
 *         description: Lista de matchs
 *   post:
 *     summary: Crea un nuevo match
 *     tags: [Matchs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario1Id:
 *                 type: integer
 *               usuario2Id:
 *                 type: integer
 *               juegoId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Match creado
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualiza un match
 *     tags: [Matchs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del match a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [activo, finalizado, cancelado]
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Match actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Match no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todos los matchs (opcional: filtrar por usuario)
router.get('/', async (req, res) => {
  try {
    const { usuarioId } = req.query;
    let where = {};
    if (usuarioId) {
      where = {
        [Op.or]: [
          { usuario1Id: usuarioId },
          { usuario2Id: usuarioId }
        ]
      };
    }
    const matchs = await Match.findAll({ where });
    res.json(matchs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener matchs' });
  }
});

// Crear un nuevo match
router.post('/', async (req, res) => {
  try {
    const { usuario1Id, usuario2Id, juegoId } = req.body;
    if (!usuario1Id || !usuario2Id || !juegoId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (usuario1Id === usuario2Id) {
      return res.status(400).json({ error: 'No puedes crear un match contigo mismo' });
    }
    const match = await Match.create({ usuario1Id, usuario2Id, juegoId });
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear match' });
  }
});

// Actualizar el estado de un match
router.put('/:id', async (req, res) => {
  try {
    const { estado, fechaFin } = req.body;
    if (estado && !['activo', 'finalizado', 'cancelado'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }
    const match = await Match.findByPk(req.params.id);
    if (!match) return res.status(404).json({ error: 'Match no encontrado' });
    if (estado) match.estado = estado;
    if (fechaFin) match.fechaFin = fechaFin;
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar match' });
  }
});

module.exports = router;
