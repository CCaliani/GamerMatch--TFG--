// Modelo Sequelize para la entidad 'Mensaje'.
// Representa los mensajes enviados entre usuarios dentro de un match.

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definición del modelo Mensaje con sus campos y restricciones
const Mensaje = sequelize.define('Mensaje', {
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'mensajes'
});


export default Mensaje;
