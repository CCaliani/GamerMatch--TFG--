const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Juego = sequelize.define('Juego', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plataforma: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'juegos'
});

module.exports = Juego;
