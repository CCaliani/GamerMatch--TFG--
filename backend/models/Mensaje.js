const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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

module.exports = Mensaje;
