const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Notificacion = sequelize.define('Notificacion', {
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('solicitud_recibida', 'solicitud_aceptada', 'solicitud_rechazada', 'nuevo_match', 'nuevo_mensaje'),
    allowNull: false
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false
  },
  leida: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notificaciones'
});

module.exports = Notificacion;
