// Modelo Sequelize para la entidad 'Usuario'.
// Define la estructura de los usuarios registrados en la plataforma.

import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

// Definición del modelo Usuario con sus campos y restricciones
const Usuario = sequelize.define(
  'Usuario',
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idioma: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataformaFavorita: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    juegoFavorito: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clerkUserId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'usuarios',
  },
)

export default Usuario
