// Rutas para la gestión de solicitudes en la plataforma.

import express from 'express';
import Solicitud from '../models/Solicitud.js';
import { Op } from 'sequelize';

const router = express.Router();

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtiene todas las solicitudes (opcional: filtrar por usuario)
 *     tags: [Solicitudes]
 *     parameters:
 *       - name: usuarioId
 *         in: query
 *         required: false
 *         description: ID del usuario para filtrar solicitudes
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crea una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioEmisorId:
 *                 type: integer
 *               usuarioReceptorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitud creada
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Actualiza el estado de una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la solicitud a actualizar
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
 *                 enum: [pendiente, aceptada, rechazada]
 *     responses:
 *       200:
 *         description: Solicitud actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Solicitud no encontrada
 *       500:
 *         description: Error interno del servidor
 */


// Obtener todas las solicitudes (opcional: filtrar por usuario)
router.get('/', async (req, res) => {
  try {
    const { usuarioId } = req.query;
    let where = {};
    if (usuarioId) {
      where = {
        [Op.or]: [
          { usuarioEmisorId: usuarioId },
          { usuarioReceptorId: usuarioId }
        ]
      };
    }
    const solicitudes = await Solicitud.findAll({ where });
    res.json(solicitudes);
  } catch {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
});

// Crear una nueva solicitud
router.post('/', async (req, res) => {
  try {
    const { usuarioEmisorId, usuarioReceptorId } = req.body;
    if (!usuarioEmisorId || !usuarioReceptorId) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (usuarioEmisorId === usuarioReceptorId) {
      return res.status(400).json({ error: 'No puedes enviarte una solicitud a ti mismo' });
    }
    const solicitud = await Solicitud.create({ usuarioEmisorId, usuarioReceptorId });
    res.status(201).json(solicitud);
  } catch {
    res.status(500).json({ error: 'Error al crear solicitud' });
  }
});

// Actualizar el estado de una solicitud
router.put('/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    if (!['pendiente', 'aceptada', 'rechazada'].includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }
    const solicitud = await Solicitud.findByPk(req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });
    solicitud.estado = estado;
    await solicitud.save();
    res.json(solicitud);
  } catch {
    res.status(500).json({ error: 'Error al actualizar solicitud' });
  }
});
export default router;
