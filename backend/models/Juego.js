// Modelo Sequelize para la entidad 'Juego'.
// Define la estructura de los juegos disponibles en la plataforma.

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definición del modelo Juego con sus campos y restricciones
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

export default Juego;
