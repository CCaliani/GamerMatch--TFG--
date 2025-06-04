// Modelo Sequelize para la entidad 'Valoracion'.
// Representa las valoraciones realizadas entre usuarios después de un match.

import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Definición del modelo Valoracion con sus campos y restricciones
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

export default Valoracion;
