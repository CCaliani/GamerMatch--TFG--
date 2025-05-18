const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { Op } = require('sequelize');

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edad:
 *                 type: integer
 *               idioma:
 *                 type: string
 *               region:
 *                 type: string
 *               plataformaFavorita:
 *                 type: string
 *               juegoFavorito:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */

// Obtener todos los usuarios (con filtros y paginación)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, region, plataformaFavorita } = req.query;
    const where = {};
    if (region) where.region = region;
    if (plataformaFavorita) where.plataformaFavorita = plataformaFavorita;
    const usuarios = await Usuario.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit)
    });
    res.json({
      total: usuarios.count,
      page: parseInt(page),
      pages: Math.ceil(usuarios.count / limit),
      data: usuarios.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, edad, idioma, region, plataformaFavorita, juegoFavorito, email, avatar } = req.body;
    // Validación básica
    if (!nombre || !edad || !idioma || !region || !plataformaFavorita || !juegoFavorito) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    if (typeof edad !== 'number' || edad < 0) {
      return res.status(400).json({ error: 'Edad no válida' });
    }
    if (email) {
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }
    }
    const usuario = await Usuario.create({ nombre, edad, idioma, region, plataformaFavorita, juegoFavorito, email, avatar });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});

// Borrar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
