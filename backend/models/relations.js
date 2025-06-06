// Definición de relaciones entre los modelos de la base de datos.
// Establece las asociaciones entre usuarios, juegos, solicitudes, matchs, mensajes, valoraciones, notificaciones y comentarios.

import Usuario from './Usuario.js';
import Juego from './Juego.js';
import Solicitud from './Solicitud.js';
import Match from './Match.js';
import Mensaje from './Mensaje.js';
import Valoracion from './Valoracion.js';
import Notificacion from './Notificacion.js';
import Comentario from './Comentario.js';

// Solicitudes
Usuario.hasMany(Solicitud, { foreignKey: 'usuarioEmisorId', as: 'solicitudesEnviadas' });
Usuario.hasMany(Solicitud, { foreignKey: 'usuarioReceptorId', as: 'solicitudesRecibidas' });
Solicitud.belongsTo(Usuario, { foreignKey: 'usuarioEmisorId', as: 'emisor' });
Solicitud.belongsTo(Usuario, { foreignKey: 'usuarioReceptorId', as: 'receptor' });

// Matchs
Usuario.hasMany(Match, { foreignKey: 'usuario1Id', as: 'matchsComoUsuario1' });
Usuario.hasMany(Match, { foreignKey: 'usuario2Id', as: 'matchsComoUsuario2' });
Match.belongsTo(Usuario, { foreignKey: 'usuario1Id', as: 'usuario1' });
Match.belongsTo(Usuario, { foreignKey: 'usuario2Id', as: 'usuario2' });
Juego.hasMany(Match, { foreignKey: 'juegoId' });
Match.belongsTo(Juego, { foreignKey: 'juegoId' });

// Mensajes
Match.hasMany(Mensaje, { foreignKey: 'matchId' });
Mensaje.belongsTo(Match, { foreignKey: 'matchId' });
Usuario.hasMany(Mensaje, { foreignKey: 'usuarioId' });
Mensaje.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Valoraciones
Match.hasMany(Valoracion, { foreignKey: 'matchId' });
Valoracion.belongsTo(Match, { foreignKey: 'matchId' });
Usuario.hasMany(Valoracion, { foreignKey: 'usuarioValoradorId', as: 'valoracionesRealizadas' });
Usuario.hasMany(Valoracion, { foreignKey: 'usuarioValoradoId', as: 'valoracionesRecibidas' });
Valoracion.belongsTo(Usuario, { foreignKey: 'usuarioValoradorId', as: 'valorador' });
Valoracion.belongsTo(Usuario, { foreignKey: 'usuarioValoradoId', as: 'valorado' });

// Notificaciones
Usuario.hasMany(Notificacion, { foreignKey: 'usuarioId' });
Notificacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Comentarios (sobre la web)
Usuario.hasMany(Comentario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
