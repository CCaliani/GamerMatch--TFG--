<script setup>
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
/* Contenedor principal: alinea el formulario y la tarjeta en columnas, igualando alturas */
.main-flex {
  display: flex;                /* Usa flexbox para columnas */
  gap: 32px;                    /* Espacio entre columnas */
  width: 100%;                  /* Ocupa todo el ancho disponible */
  align-items: stretch;         /* Igual altura para hijos */
  justify-content: center;      /* Centra horizontalmente el contenido */
  min-height: 400px;            /* Altura mínima para el bloque */
  box-sizing: border-box;       /* Incluye padding/border en el tamaño */
}

/* Columna del formulario de búsqueda */
.search-settings {
  max-width: 400px;             /* Ancho máximo del formulario */
  width: 100%;                  /* Ocupa todo el ancho posible hasta el máximo */
  flex: 1 1 0;                  /* Toma menos espacio que la tarjeta */
  display: flex;                /* Flexbox para organizar el contenido */
  flex-direction: column;       /* Apila los hijos en columna */
  background: rgba(255,255,255,0.08); /* Fondo translúcido */
  padding: 24px;                /* Espaciado interno */
  border-radius: 10px;          /* Bordes redondeados */
  color: white;                 /* Texto blanco */
  box-sizing: border-box;       /* Incluye padding/border en el tamaño */
  /* NO height: 100% aquí para evitar recortes */
}

/* Formulario: apila los campos verticalmente y separa con espacio */
form {
  display: flex;                /* Flexbox para los campos */
  flex-direction: column;       /* Apila los campos en columna */
  gap: 10px;                    /* Espacio entre campos */
}

/* Etiquetas del formulario: apila label y campo, y da estilo al texto */
label {
  display: flex;                /* Flexbox para label + input/select */
  flex-direction: column;       /* Apila verticalmente */
  font-size: 1.08rem;           /* Tamaño de fuente */
  color: rgb(182, 176, 176);
  gap: 4px;                     /* Espacio entre texto y campo */
}

/* Inputs y selects: estilo visual uniforme */
input, select {
  padding: 6px 10px;            /* Espaciado interno */
  border-radius: 5px;           /* Bordes redondeados */
  border: none;                 /* Sin borde por defecto */
  font-size: 1rem;              /* Tamaño de fuente estándar */
}

/* Contenedor de la tarjeta y detalles del jugador */
.player-layout {
  flex: 2 1 0;                  /* Ocupa más espacio que el formulario */
  display: flex;                /* Flexbox para tarjeta y detalles */
  flex-direction: row;          /* Tarjeta y detalles en fila */
  gap: 32px;                    /* Espacio entre tarjeta y detalles */
  align-items: stretch;         /* Igual altura para hijos */
  width: 100%;                  /* Ocupa todo el ancho disponible */
  background: rgba(255,255,255,0.10); /* Fondo translúcido */
  border-radius: 16px;          /* Bordes redondeados */
  padding: 32px 24px;           /* Espaciado interno */
  color: #fff;                /* Texto blanco */
  box-sizing: border-box;       /* Incluye padding/border en el tamaño */
}

/* Tarjeta del jugador: foto, nombre y descripción */
.player-card {
  display: flex;                /* Flexbox para contenido */
  flex-direction: column;       /* Apila verticalmente */
  align-items: center;          /* Centra horizontalmente */
  background: rgba(212,1,183,0.10); /* Fondo translúcido */
  border-radius: 12px;          /* Bordes redondeados */
  padding: 36px 24px;           /* Espaciado interno */
  min-width: 600px;             /* Ancho mínimo */
  max-width: 900px;             /* Ancho máximo */
  justify-content: center;      /* Centra verticalmente */
}

/* Avatar del jugador */
.player-avatar {
  width: 110px;                 /* Tamaño fijo */
  height: 110px;
  border-radius: 50%;           /* Circular */
  object-fit: cover;            /* Recorta la imagen */
  border: 3px solid #d401b7;    /* Borde rosa */
  margin-bottom: 18px;          /* Espacio debajo */
}

/* Nombre del jugador en la tarjeta */
.player-card h2 {
  margin: 0 0 10px 0;           /* Espacio debajo */
  font-size: 1.8rem;            /* Tamaño grande */
}

/* Descripción del jugador */
.player-desc {
  font-style: italic;           /* Cursiva */
  opacity: 0.92;                /* Un poco translúcido */
  text-align: center;           /* Centrado */
  font-size: 1.08rem;           /* Tamaño de fuente */
}

.search-settings h2{
  color:white;
  font-size: 1.7rem;           /* Tamaño de fuente */
  text-align: center;           /* Centrado */
}

/* Detalles del jugador (plataforma, idioma, etc.) */
.player-info {
  flex: 2 1 0;                  /* Ocupa más espacio que la tarjeta */
  background: rgba(0,0,0,0.08); /* Fondo translúcido oscuro */
  border-radius: 12px;          /* Bordes redondeados */
  padding: 24px 18px;           /* Espaciado interno */
  display: flex;                /* Flexbox para contenido */
  flex-direction: column;       /* Apila verticalmente */
  justify-content: center;      /* Centra verticalmente */
}

.player-info h2 {
  margin: 0 0 18px 0;           /* Espacio debajo */
  font-size: 1.7rem;   /* Tamaño de fuente */
  text-align: center; /* Centrado */
}

/* Lista de detalles del jugador */
.player-info ul {
  list-style: none;             /* Sin viñetas */
  padding: 0;
  margin: 0 0 18px 0;           /* Espacio debajo */
}

/* Elementos de la lista de detalles */
.player-info li {
  margin-bottom: 10px;          /* Espacio entre detalles */
  font-size: 1.08rem;           /* Tamaño de fuente */
}

/* Título de coincidencias */
.player-matches h3 {
  color: #d401b7;               /* Rosa */
  margin-bottom: 6px;           /* Espacio debajo */
}

/* Lista de coincidencias */
.player-matches ul {
  padding-left: 18px;           /* Sangría */
}

/* Placeholder vacío */
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

/* Responsive: apila columnas en móvil */
@media (max-width: 700px) {
  .main-flex {
    flex-direction: column;     /* Apila formulario y tarjeta */
    gap: 18px;                  /* Menos espacio entre bloques */
    min-height: unset;
    height: auto;
  }
  .search-settings, .player-layout {
    padding: 18px 8px;          /* Menos padding */
    max-width: 100%;
    height: auto;
  }
  .player-layout {
    flex-direction: column;     /* Apila tarjeta y detalles */
  }
}
</style>
