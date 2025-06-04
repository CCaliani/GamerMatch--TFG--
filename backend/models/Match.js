// Modelo Sequelize para la entidad 'Match'.
// Representa los emparejamientos entre usuarios para jugar un determinado juego.

import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

// Definición del modelo Match con sus campos y restricciones
const Match = sequelize.define(
  'Match',
  {
    usuario1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    juegoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('activo', 'finalizado', 'cancelado'),
      defaultValue: 'activo',
    },
    fechaInicio: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'matchs',
  },
)



// Ejemplos de uso:
// Obtener todos los matchs
Match.findAll()
// Crear un nuevo match
Match.create({ usuario1Id: 1, usuario2Id: 2, juegoId: 3 })
// Buscar un match por su clave primaria
Match.findByPk(1)

export default Match
