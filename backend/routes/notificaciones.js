// Rutas para la gestión de notificaciones en la plataforma.

import { Router } from 'express'
const router = Router()
import Notificacion from '../models/Notificacion.js'

/**
 * @swagger
 * /api/notificaciones:
 *   get:
 *     summary: Obtiene todas las notificaciones de un usuario
 *     tags: [Notificaciones]
 *     parameters:
 *       - name: usuarioId
 *         in: query
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   post:
 *     summary: Crea una nueva notificación
 *     tags: [Notificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notificación creada
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *   put:
 *     summary: Marca una notificación como leída
 *     tags: [Notificaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la notificación a marcar como leída
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leida:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Notificación actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Notificación no encontrada
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todas las notificaciones de un usuario
router.get('/', async (req, res) => {
  try {
    const { usuarioId } = req.query
    if (!usuarioId) return res.status(400).json({ error: 'usuarioId es requerido' })
    const notificaciones = await Notificacion.findAll({
      where: { usuarioId },
      order: [['fecha', 'DESC']],
    })
    res.json(notificaciones)
  } catch {
    res.status(500).json({ error: 'Error al obtener notificaciones' })
  }
})

// Crear una nueva notificación
router.post('/', async (req, res) => {
  try {
    const { usuarioId, tipo, mensaje } = req.body
    if (!usuarioId || !tipo || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }
    const notificacion = await Notificacion.create({ usuarioId, tipo, mensaje })
    res.status(201).json(notificacion)
  } catch {
    res.status(500).json({ error: 'Error al crear notificación' })
  }
})

// Marcar una notificación como leída
router.put('/:id', async (req, res) => {
  try {
    const notificacion = await Notificacion.findByPk(req.params.id)
    if (!notificacion) return res.status(404).json({ error: 'Notificación no encontrada' })
    notificacion.leida = true
    await notificacion.save()
    res.json(notificacion)
  } catch {
    res.status(500).json({ error: 'Error al actualizar notificación' })
  }
})

export default router
