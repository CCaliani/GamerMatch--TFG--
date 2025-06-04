// Modelo Sequelize para la entidad 'Solicitud'.
// Representa las solicitudes de amistad o juego entre usuarios.

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definición del modelo Solicitud con sus campos y restricciones
const Solicitud = sequelize.define('Solicitud', {
  usuarioEmisorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioReceptorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
    defaultValue: 'pendiente'
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'solicitudes'
});

export default Solicitud;
