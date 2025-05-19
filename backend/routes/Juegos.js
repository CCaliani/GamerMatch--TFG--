// Rutas para la gestión de juegos en la plataforma.

const express = require('express');
const router = express.Router();
const Juego = require('../models/Juego');

/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtiene todos los juegos
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Lista de juegos
 *   post:
 *     summary: Crea un nuevo juego
 *     tags: [Juegos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               plataforma:
 *                 type: string
 *               genero:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Juego creado
 */

// Obtener todos los juegos
router.get('/', async (req, res) => {
  try {
    const juegos = await Juego.findAll();
    res.json(juegos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// Crear un nuevo juego
router.post('/', async (req, res) => {
  try {
    const { nombre, plataforma, genero, imagen } = req.body;
    if (!nombre || !plataforma) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const juego = await Juego.create({ nombre, plataforma, genero, imagen });
    res.status(201).json(juego);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

module.exports = router;
