// Archivo principal del servidor Express y Socket.IO para GamerMatch.
// Configura middlewares, rutas, documentación Swagger y la integración con WebSockets.

import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import sequelize from './db.js'
import './models/relations.js'
import comentariosRouter from './routes/Comentarios.js'
import usuariosRouter from './routes/usuarios.js'
import juegosRouter from './routes/Juegos.js'
import solicitudesRouter from './routes/solicitudes.js'
import matchsRouter from './routes/matchs.js'
import mensajesRouter from './routes/mensajes.js'
import valoracionesRouter from './routes/valoraciones.js'
import notificacionesRouter from './routes/notificaciones.js'
import authRouter from './routes/auth.js'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

const app = express()
const PORT = 3000

app.use(cors({ origin: 'http://localhost:5173' })) // Cambiar por el frontend en producción
app.use(express.json())
app.use('/api/comentarios', comentariosRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/juegos', juegosRouter)
app.use('/api/solicitudes', solicitudesRouter)
app.use('/api/matchs', matchsRouter)
app.use('/api/mensajes', mensajesRouter)
app.use('/api/valoraciones', valoracionesRouter)
app.use('/api/notificaciones', notificacionesRouter)
app.use('/api/auth', authRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

sequelize
  .sync()
  .then(() => {
    const server = http.createServer(app)
    const io = new Server(server, { cors: { origin: '*' } })

    let users = []

    app.get('/', (req, res) => {
      res.send('Servidor Express funcionando con Socket.IO')
    })

    io.on('connection', (socket) => {
      console.log('Usuario conectado:', socket.id)

      // Cuando un usuario se une
      socket.on('user-join', (user) => {
        // user.accepted debe ser un array de ids de usuarios aceptados
        users = users.filter((u) => u.id !== user.id && u.socketId !== socket.id)
        users.push({ ...user, socketId: socket.id, accepted: user.accepted || [] })
        // Emitimos la lista filtrada a cada usuario
        users.forEach((u) => {
          const visibleUsers = users.filter(
            (other) =>
              other.id !== u.id &&
              other.status !== 'desconectado' &&
              u.accepted.includes(other.id) &&
              other.accepted.includes(u.id),
          )
          io.to(u.socketId).emit('users-update', visibleUsers)
        })
      })

      // Cuando un usuario acepta a otro
      socket.on('accept-invitation', ({ fromId, toId }) => {
        const user = users.find((u) => u.id === fromId)
        if (user && !user.accepted.includes(toId)) {
          user.accepted.push(toId)
        }
        // Actualiza la lista para ambos usuarios
        users.forEach((u) => {
          const visibleUsers = users.filter(
            (other) =>
              other.id !== u.id &&
              other.status !== 'desconectado' &&
              u.accepted.includes(other.id) &&
              other.accepted.includes(u.id),
          )
          io.to(u.socketId).emit('users-update', visibleUsers)
        })
      })

      // Cuando un usuario cambia de estado
      socket.on('status-update', (user) => {
        const idx = users.findIndex((u) => u.id === user.id)
        if (idx !== -1) {
          users[idx].status = user.status
        }
        // Actualiza la lista para todos
        users.forEach((u) => {
          const visibleUsers = users.filter(
            (other) =>
              other.id !== u.id &&
              other.status !== 'desconectado' &&
              u.accepted.includes(other.id) &&
              other.accepted.includes(u.id),
          )
          io.to(u.socketId).emit('users-update', visibleUsers)
        })
      })

      // Mensajes de chat
      socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg)
      })

      // Cuando un usuario se desconecta
      socket.on('disconnect', () => {
        users = users.filter((u) => u.socketId !== socket.id)
        // Actualiza la lista para todos
        users.forEach((u) => {
          const visibleUsers = users.filter(
            (other) =>
              other.id !== u.id &&
              other.status !== 'desconectado' &&
              u.accepted.includes(other.id) &&
              other.accepted.includes(u.id),
          )
          io.to(u.socketId).emit('users-update', visibleUsers)
        })
        console.log('Usuario desconectado:', socket.id)
      })
    })

    server.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err)
  })
