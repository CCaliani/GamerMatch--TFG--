// Rutas para la gestión de usuarios en la plataforma.

import express from 'express'
import Usuario from '../models/Usuario.js'
import { clerkAuth } from '../middleware/clerkAuth.js'

// importa tu middleware de autenticación si lo tienes
// import authMiddleware from '../middlewares/auth.js';

const router = express.Router()

// Obtener todos los usuarios (con filtros y paginación)
router.get('/', async (req, res) => {
  try {
    const { juego, idioma, plataforma, region, nivel, page = 1, limit = 10 } = req.query
    const where = {}
    if (idioma) where.idioma = idioma
    if (plataforma) where.plataformaFavorita = plataforma
    if (region) where.region = region
    if (nivel) where.nivel = nivel

    let usuarios = await Usuario.findAll({ where })

    // Coincidencias y orden
    if (juego) {
      usuarios = usuarios.map((u) => ({
        ...u.toJSON(),
        coincidencias: [
          u.juegosFavoritos && u.juegosFavoritos.includes(juego) ? 100 : 0,
          u.idioma === idioma ? 10 : 0,
          u.plataformaFavorita === plataforma ? 5 : 0,
          (u.region === region ? 1 : 0) + (u.nivel === nivel ? 1 : 0),
        ].reduce((a, b) => a + b, 0),
      }))
      usuarios = usuarios.sort((a, b) => b.coincidencias - a.coincidencias)
    }

    // Paginación manual
    const total = usuarios.length
    const paged = usuarios.slice((page - 1) * limit, page * limit)

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: paged,
    })
  } catch (err) {
    console.error('Error en /api/usuarios:', err)
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

// Crear un nuevo usuario desde Clerk
router.post('/', async (req, res) => {
  try {
    console.log('Datos recibidos en POST /api/usuarios:', req.body) // <-- Añade esto
    const {
      clerkUserId,
      email,
      nombre,
      avatar,
      edad,
      idioma,
      region,
      plataformaFavorita,
      juegoFavorito,
    } = req.body
    if (!clerkUserId || !email || !nombre) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }
    let usuario = await Usuario.findOne({ where: { clerkUserId } })
    if (!usuario) {
      usuario = await Usuario.create({
        clerkUserId,
        email,
        nombre,
        avatar,
        edad,
        idioma,
        region,
        plataformaFavorita,
        juegoFavorito,
      })
    }
    res.status(201).json(usuario)
  } catch (err) {
    console.error('Error al crear usuario:', err) // <-- Añade esto
    res.status(500).json({ error: 'Error al crear usuario' })
  }
})

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
    await usuario.update(req.body)
    res.json(usuario)
  } catch (err) {
    console.error('Error al actualizar usuario:', err)
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
})

// Borrar usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id)
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
    await usuario.destroy()
    res.json({ mensaje: 'Usuario eliminado' })
  } catch (err) {
    console.error('Error al eliminar usuario:', err)
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
})

// Obtener perfil de usuario autenticado con Clerk
router.get('/perfil', clerkAuth, async (req, res) => {
  try {
    const clerkUserId = req.auth.userId
    let usuario = await Usuario.findOne({ where: { clerkUserId } })

    // Clerk claims pueden no estar presentes, pon valores por defecto si faltan
    const claims = req.auth.sessionClaims || {}
    if (!usuario) {
      usuario = await Usuario.create({
        clerkUserId,
        email: claims.email || '',
        nombre: claims.first_name || '',
        avatar: claims.profile_image_url || '',
        edad: claims.age || null,
        idioma: claims.language || '',
        region: claims.region || '',
        plataformaFavorita: claims.favorite_platform || '',
        juegoFavorito: claims.favorite_game || '',
      })
    }

    res.json(usuario)
  } catch (err) {
    console.error('Error en /api/usuarios/perfil:', err)
    res.status(500).json({ error: 'Error al obtener perfil' })
  }
})

// Actualizar perfil de usuario
router.put(
  '/api/usuarios/:id',
  /*authMiddleware,*/ async (req, res) => {
    const { id } = req.params
    const { descripcion, avatar, juegosFavoritos, plataformaFavorita, idioma, region } = req.body

    try {
      // Busca el usuario por clerkUserId
      const usuario = await Usuario.findOne({ where: { clerkUserId: id } })
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
      }

      // Actualiza los campos editables
      usuario.descripcion = descripcion
      usuario.avatar = avatar
      usuario.juegoFavorito = juegosFavoritos // Ojo: en tu modelo es 'juegoFavorito' (singular)
      usuario.plataformaFavorita = plataformaFavorita
      usuario.idioma = idioma
      usuario.region = region

      await usuario.save()

      res.status(200).json({ message: 'Perfil actualizado' })
    } catch {
      res.status(500).json({ message: 'Error al actualizar perfil' })
    }
  },
)

export default router
