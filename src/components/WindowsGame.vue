<script setup>
//Componente de pantalla de "juego" para buscar jugadores y mostrar detalles de un jugador específico.
// Este componente incluye un formulario para filtrar jugadores por juego, plataforma, idioma, región y nivel.
// También muestra detalles del jugador seleccionado y permite enviar una solicitud para hablar por el chat.

import { ref } from 'vue';
import { useJugadoresApi } from '../composables/useJugadores';

defineProps({
  jugador: {
    type: Object,
    default: () => ({
      nombre: "Juan",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      plataforma: "PlayStation",
      idioma: "Inglés",
      region: "América",
      nivel: "Avanzado",
      juegos: ["FIFA", "Call of Duty"],
      descripcion: "Me gusta jugar en equipo y competir."
    })
  },
  coincidencias: {
    type: Array,
    default: () => []
  }
});

import CustomButton from './CustomButton.vue';

const plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Móvil'];
const idiomas = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano'];
const regiones = ['Europa', 'América', 'Asia', 'Oceanía', 'África'];
const niveles = ['Principiante', 'Intermedio', 'Avanzado', 'Experto'];

const filtros = ref({
  juego: '',
  plataforma: '',
  idioma: '',
  region: '',
  nivel: ''
});

const { jugadores, loading, error, buscarJugadores } = useJugadoresApi();

function onBuscar() {
  buscarJugadores(filtros.value);
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
      <div v-if="loading">Cargando...</div>
      <div v-if="error">{{ error }}</div>
    </div>

    <div class="player-layout">
      <template v-if="jugadores.length">
        <div v-for="jugador in jugadores" :key="jugador.id" class="player-card">
          <img :src="jugador.avatar" alt="Avatar" class="player-avatar" />
          <h2>{{ jugador.nombre }}</h2>
          <p class="player-desc">{{ jugador.descripcion }}</p>
        </div>
        <div class="player-info">
          <h2>Detalles del jugador</h2>
          <ul>
            <li><strong>Plataforma:</strong> {{ jugador.plataforma }}</li>
            <li><strong>Idioma:</strong> {{ jugador.idioma }}</li>
            <li><strong>Región:</strong> {{ jugador.region }}</li>
            <li><strong>Nivel:</strong> {{ jugador.nivel }}</li>
            <li><strong>Juegos:</strong> {{ jugador.juegos.join(', ') }}</li>
          </ul>
          <CustomButton @click="$emit('match')">Enviar solicitud</CustomButton>
          <div v-if="coincidencias.length" class="player-matches">
            <h3>Coincidencias:</h3>
            <ul>
              <li v-for="c in coincidencias" :key="c">{{ c }}</li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="player-card empty">
          <div class="player-avatar placeholder"></div>
          <h2>Sin jugadores</h2>
          <p class="player-desc">Busca jugadores usando los filtros.</p>
        </div>
        <div class="player-info empty">
          <h2>Detalles del jugador</h2>
          <p>No hay información para mostrar.</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.main-flex {
  display: flex;
  gap: 32px;
  width: 100%;
  align-items: stretch;
  justify-content: center;
  min-height: 400px;
  box-sizing: border-box;
}
.search-settings {
  max-width: 400px;
  width: 100%;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  background: rgba(255,255,255,0.08);
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
input, select {
  padding: 6px 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}
.player-layout {
  flex: 2 1 0;
  display: flex;
  flex-direction: row;
  gap: 32px;
  align-items: stretch;
  width: 100%;
  background: rgba(255,255,255,0.10);
  border-radius: 16px;
  padding: 32px 24px;
  color: #fff;
  box-sizing: border-box;
}
.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(212,1,183,0.10);
  border-radius: 12px;
  padding: 36px 24px;
  min-width: 600px;
  max-width: 900px;
  justify-content: center;
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
}
.player-desc {
  font-style: italic;
  opacity: 0.92;
  text-align: center;
  font-size: 1.08rem;
}
.search-settings h2{
  color:white;
  font-size: 1.7rem;
  text-align: center;
}
.player-info {
  flex: 2 1 0;
  background: rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.player-info h2 {
  margin: 0 0 18px 0;
  font-size: 1.7rem;
  text-align: center;
}
.player-info ul {
  list-style: none;
  padding: 0;
  margin: 0 0 18px 0;
}
.player-info li {
  margin-bottom: 10px;
  font-size: 1.08rem;
}
.player-matches h3 {
  color: #d401b7;
  margin-bottom: 6px;
}
.player-matches ul {
  padding-left: 18px;
}
.player-card.empty, .player-info.empty {
  opacity: 0.6;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.player-avatar.placeholder {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #d401b733;
  margin-bottom: 18px;
  display: inline-block;
}
@media (max-width: 700px) {
  .main-flex {
    flex-direction: column;
    gap: 18px;
    min-height: unset;
    height: auto;
  }
  .search-settings, .player-layout {
    padding: 18px 8px;
    max-width: 100%;
    height: auto;
  }
  .player-layout {
    flex-direction: column;
  }
}
</style>
