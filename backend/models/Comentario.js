// Modelo Sequelize para la tabla 'comentarios'.
// Representa los comentarios realizados por los usuarios.

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definición del modelo Comentario
const Comentario = sequelize.define('Comentario', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  texto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'comentarios'
});

export default Comentario;
