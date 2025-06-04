
// Rutas de autenticación para registro e inicio de sesión de usuarios.

import express from 'express';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();


import process from 'process';
const SECRET = process.env.JWT_SECRET || 'secreto';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error de validación
 */

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, ...rest } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan campos' });
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash, ...rest });
    res.status(201).json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});
export default router;
