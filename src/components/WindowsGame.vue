<script setup>
//Componente de pantalla de "juego" para buscar jugadores y mostrar detalles de un jugador específico.
// Este componente incluye un formulario para filtrar jugadores por juego, plataforma, idioma, región y nivel.
// También muestra detalles del jugador seleccionado y permite enviar una solicitud para hablar por el chat.

import { ref } from 'vue'
import { useJugadoresApi } from '../composables/useJugadores'
import CustomButton from './CustomButton.vue'

const { jugadores, loading, error, buscarJugadores } = useJugadoresApi()

const plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Móvil']
const idiomas = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano']
const regiones = ['Europa', 'América', 'Asia', 'Oceanía', 'África']
const niveles = ['Principiante', 'Intermedio', 'Avanzado', 'Experto']

const filtros = ref({
  juego: '',
  plataforma: '',
  idioma: '',
  region: '',
  nivel: '',
})
const currentIndex = ref(0)

function onBuscar() {
  buscarJugadores(filtros.value)
  currentIndex.value = 0
}

function nextJugador() {
  if (currentIndex.value < jugadores.value.length - 1) currentIndex.value++
}
function prevJugador() {
  if (currentIndex.value > 0) currentIndex.value--
}

async function enviarSolicitud(usuarioReceptorId) {
  const usuarioEmisorId = Number(localStorage.getItem('usuarioId'))
  if (!usuarioEmisorId) {
    alert('No se pudo obtener tu usuario interno. Reloguea.')
    return
  }
  const res = await fetch('http://localhost:3000/api/solicitudes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioEmisorId, usuarioReceptorId }),
  })
  if (res.ok) {
    alert('Solicitud enviada')
  } else {
    alert('Error al enviar solicitud')
  }
}
</script>

<template>
  <div class="main-flex">
    <div class="search-settings">
      <form @submit.prevent="onBuscar">
        <h2>Filtros de búsqueda</h2>
        <label>
          Juego:
          <input v-model="filtros.juego" type="text" name="juego" placeholder="Nombre del juego" />
        </label>
        <label>
          Plataforma:
          <select v-model="filtros.plataforma" name="plataforma">
            <option disabled selected value="">Selecciona una plataforma</option>
            <option v-for="p in plataformas" :key="p" :value="p">{{ p }}</option>
          </select>
        </label>
        <label>
          Idioma:
          <select v-model="filtros.idioma" name="idioma">
            <option disabled selected value="">Selecciona un idioma</option>
            <option v-for="i in idiomas" :key="i" :value="i">{{ i }}</option>
          </select>
        </label>
        <label>
          Región:
          <select v-model="filtros.region" name="region">
            <option disabled selected value="">Selecciona una región</option>
            <option v-for="r in regiones" :key="r" :value="r">{{ r }}</option>
          </select>
        </label>
        <label>
          Nivel:
          <select v-model="filtros.nivel" name="nivel">
            <option disabled selected value="">Selecciona un nivel</option>
            <option v-for="n in niveles" :key="n" :value="n">{{ n }}</option>
          </select>
        </label>
        <CustomButton type="submit">Buscar</CustomButton>
      </form>
      <div v-if="loading">Buscando...</div>
      <div v-if="error">{{ error }}</div>
    </div>

    <div class="player-card">
      <button
        v-if="jugadores.length > 1"
        class="nav-arrow left"
        @click="prevJugador"
        :disabled="currentIndex === 0"
        aria-label="Anterior"
      >
        ←
      </button>

      <img
        v-if="jugadores.length"
        :src="jugadores[currentIndex].avatar"
        alt="Avatar"
        class="player-avatar"
      />
      <div v-else class="player-avatar placeholder"></div>
      <h2>
        {{ jugadores.length ? jugadores[currentIndex].nombre : 'Sin jugadores' }}
      </h2>
      <p class="player-desc">
        {{
          jugadores.length
            ? jugadores[currentIndex].descripcion
            : 'Busca jugadores usando los filtros.'
        }}
      </p>

      <button
        v-if="jugadores.length > 1"
        class="nav-arrow right"
        @click="nextJugador"
        :disabled="currentIndex === jugadores.length - 1"
        aria-label="Siguiente"
      >
        →
      </button>
    </div>

    <div class="player-info">
      <ul v-if="jugadores.length">
        <h2>Detalles del jugador</h2>

        <li><strong>Juego:</strong>{{ jugadores[currentIndex].juegoFavoritos }}</li>
        <li><strong>Plataforma:</strong> {{ jugadores[currentIndex].plataformaFavorita }}</li>
        <li><strong>Idioma:</strong> {{ jugadores[currentIndex].idioma }}</li>
        <li><strong>Región:</strong> {{ jugadores[currentIndex].region }}</li>
        <li><strong>Nivel:</strong> {{ jugadores[currentIndex].nivel }}</li>
        <li>
          <strong>Juegos:</strong>
          {{
            Array.isArray(jugadores[currentIndex].juegos)
              ? jugadores[currentIndex].juegos.join(', ')
              : jugadores[currentIndex].juegos || ''
          }}
        </li>
      </ul>
      <CustomButton v-if="jugadores.length" @click="enviarSolicitud(jugadores[currentIndex].id)">
        Enviar solicitud
      </CustomButton>
      <div v-else class="empty">
        <h2>Detalles del jugador</h2>
        <p>No hay información para mostrar.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-flex {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 100vw;
  margin: 32px auto 0 auto;
  align-items: stretch;
  justify-content: center;
  min-height: 300px;
  box-sizing: border-box;
  padding: 0 16px;
  overflow-x: hidden;
}

.search-settings,
.player-info {
  max-width: 320px;
  flex: 0 1 320px;
  min-width: 0;
  width: 100%;
}

.player-card {
  min-width: 0;
  max-width: 480px;
  flex: 1 1 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(212, 1, 183, 0.1);
  border-radius: 12px;
  padding: 36px 24px;
  justify-content: center;
}

.search-settings {
  max-width: 350px; /* Más ancho */
  width: 100%;
  flex: 0 0 600px; /* Más ancho */
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.08);
  padding: 24px;
  border-radius: 10px;
  color: white;
  box-sizing: border-box;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
label {
  display: flex;
  flex-direction: column;
  font-size: 1.08rem;
  color: rgb(182, 176, 176);
  gap: 4px;
}
input,
select {
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}
.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(212, 1, 183, 0.1);
  border-radius: 12px;
  padding: 36px 24px;
  min-width: 600px;
  max-width: 900px;
  justify-content: center;
  position: relative;
}
.player-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #d401b7;
  margin-bottom: 18px;
}
.player-card h2 {
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  color: #fff;
  opacity: 0.85;
  text-align: center;
}
.player-desc {
  font-style: italic;
  opacity: 0.92;
  text-align: center;
  font-size: 1.08rem;
}
.search-settings h2 {
  color: white;
  font-size: 1.7rem;
  text-align: center;
}
.player-info {
  max-width: 350px; /* Más ancho */
  width: 100%;
  flex: 0 0 400px; /* Más ancho */
  background: rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  box-sizing: border-box;
}
.player-info h2 {
  margin: 0 0 18px 0;
  font-size: 1.7rem;
  text-align: center;
  color: #fff;
  opacity: 1;
}
.player-info ul {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}
.player-info li {
  margin-bottom: 10px;
  font-size: 1.08rem;
  color: #fff;
}
.player-info li strong {
  color: #fff;
  opacity: 1;
  font-weight: bold;
}
.player-info li span,
.player-info li .detalle-valor {
  color: #ccc;
  opacity: 0.8;
  font-weight: normal;
}

.player-info li {
  color: #fff;
}
.player-info li strong {
  color: #fff;
}
.player-info li:not(:first-child) {
  color: #ccc;
  opacity: 0.85;
  font-weight: normal;
}
.player-card.empty,
.player-info.empty {
  opacity: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 180px;
}
.player-avatar.placeholder {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #d401b733;
  margin-bottom: 18px;
  display: inline-block;
}
.player-navigation {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(212, 1, 183, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  color: #fff;
  opacity: 0.7;
}

.nav-arrow:hover:not(:disabled) {
  background: #d401b7;
  opacity: 1;
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.nav-arrow.left {
  left: -12px; /* Más cerca del centro */
}
.nav-arrow.right {
  right: -12px; /* Más cerca del centro */
}
@media (max-width: 700px) {
  .main-flex {
    flex-direction: column;
    gap: 18px;
    min-height: unset;
    height: auto;
  }
  .search-settings,
  .player-card,
  .player-info {
    padding: 18px 8px;
    max-width: 100%;
    height: auto;
  }
  .player-card {
    flex-direction: column;
  }
}
@media (max-width: 900px) {
  .player-card {
    flex-direction: column;
    min-height: unset;
    padding: 18px 8px;
  }
  .nav-arrow {
    display: none !important;
  }
}
</style>
