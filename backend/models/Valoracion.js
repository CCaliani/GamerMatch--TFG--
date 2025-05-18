const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Valoracion = sequelize.define('Valoracion', {
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioValoradorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuarioValoradoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'valoraciones'
});

module.exports = Valoracion;
