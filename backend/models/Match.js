const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Match = sequelize.define('Match', {
  usuario1Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  usuario2Id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  juegoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activo', 'finalizado', 'cancelado'),
    defaultValue: 'activo'
  },
  fechaInicio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'matchs'
});

module.exports = Match;
