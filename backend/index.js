const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./db');
require('./models/relations');
const comentariosRouter = require('./routes/Comentarios');
const usuariosRouter = require('./routes/usuarios');
const juegosRouter = require('./routes/Juegos');
const solicitudesRouter = require('./routes/solicitudes');
const matchsRouter = require('./routes/matchs');
const mensajesRouter = require('./routes/mensajes');
const valoracionesRouter = require('./routes/valoraciones');
const notificacionesRouter = require('./routes/notificaciones');
const authRouter = require('./routes/auth');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' })); // Cambia por tu frontend en producción
app.use(express.json());
app.use('/api/comentarios', comentariosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/juegos', juegosRouter);
app.use('/api/solicitudes', solicitudesRouter);
app.use('/api/matchs', matchsRouter);
app.use('/api/mensajes', mensajesRouter);
app.use('/api/valoraciones', valoracionesRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

sequelize.sync().then(() => {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });

  let users = [];

  app.get('/', (req, res) => {
    res.send('Servidor Express funcionando con Socket.IO');
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Cuando un usuario se une
    socket.on('user-join', (user) => {
      // Añade usuario si no existe
      if (!users.find(u => u.id === user.id)) {
        users.push({ ...user });
      }
      io.emit('users-update', users);
    });

    // Cuando un usuario cambia de estado
    socket.on('status-update', (user) => {
      const idx = users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        users[idx].status = user.status;
      }
      io.emit('users-update', users);
    });

    // Mensajes de chat
    socket.on('chat-message', (msg) => {
      io.emit('chat-message', msg);
    });

    // Cuando un usuario se desconecta
    socket.on('disconnect', () => {
      users = users.map(u =>
        u.socketId === socket.id
          ? { ...u, status: 'desconectado' }
          : u
      );
      io.emit('users-update', users);
      console.log('Usuario desconectado:', socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});
