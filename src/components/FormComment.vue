<script setup>
import { ref } from 'vue';

const emit = defineEmits(['nuevo-comentario']);

const nombre = ref('');
const valoracion = ref('');
const comentario = ref('');
const mensaje = ref('');

function enviarComentario() {
  if (!nombre.value || !valoracion.value || !comentario.value) {
    mensaje.value = 'Por favor, completa todos los campos.';
    return;
  }
  emit('nuevo-comentario', {
    user: nombre.value,
    rating: valoracion.value,
    text: comentario.value,
    id: Date.now()
  });
  mensaje.value = '¡Gracias por tu comentario!';
  nombre.value = '';
  valoracion.value = '';
  comentario.value = '';
  setTimeout(() => mensaje.value = '', 2000);
}
</script>

<template>
  <form class="form-comment" @submit.prevent="enviarComentario">
    <div class="form-title">
      <h2>Deja tu comentario</h2>
    </div>
    <div class="form-fields-row">
      <div class="form-col">
        <label>
          Nombre:
          <input v-model="nombre" type="text" required maxlength="20" placeholder="Tu nombre" />
        </label>
      </div>
      <div class="form-col">
        <label>
          Valoración:
          <select v-model.number="valoracion" required>
            <option disabled value="">Selecciona</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
          </select>
        </label>
      </div>
      <div class="form-col">
        <label>
          Comentario:
          <textarea v-model="comentario" required maxlength="120" placeholder="¿Qué opinas de la web?"></textarea>
        </label>
      </div>
      <div class="form-col form-actions">
        <button type="submit">Enviar</button>
        <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* Contenedor principal del formulario de comentarios */
.form-comment {
  background: rgba(255, 255, 255, 0.08); /* Fondo translúcido */
  padding: 2rem 1.5rem;                  /* Espaciado interno */
  border-radius: 16px;                   /* Bordes redondeados */
  max-width: 100vw;                      /* No sobrepasa el ancho de la ventana */
  width: 70vw;                           /* Ocupa el 70% del ancho de la ventana */
  margin: 3rem auto 2rem auto;           /* Centrado horizontal y margen superior e inferior */
  color: #fff;                           /* Texto blanco */
  display: flex;                         /* Flexbox para apilar título y campos */
  flex-direction: column;                /* Apila verticalmente */
  gap: 0.7rem;                           /* Espacio entre título y campos */
  box-sizing: border-box;                /* Incluye padding y borde en el tamaño */
}

/* Contenedor del título del formulario */
.form-title {
  align-self: flex-start;                /* Alinea el título a la izquierda */
}

/* Estilo del título */
.form-title h2 {
  font-size: 1.4rem;                     /* Tamaño de fuente del título */
}

/* Fila que contiene todos los campos del formulario en horizontal */
.form-fields-row {
  display: flex;                         /* Flexbox para los campos */
  flex-direction: column 4;                   /* Alinea los campos en fila */
  gap: 1.1rem;                           /* Espacio entre columnas */
  align-items: center;                 /* Alinea los campos al fondo */
  width: 100%;                           /* Ocupa todo el ancho disponible */
}

/* Columna individual para cada campo */
.form-col {
  display: flex;                         /* Flexbox para apilar label y campo */
  flex-direction: column;                /* Apila verticalmente */
  flex: 1 1 0;                           /* Crece igual que las demás columnas */
  min-width: 0;                          /* Permite que se reduzca el ancho */
  gap: 0.3rem;                           /* Espacio entre label y campo */
}

/* Estilo para las etiquetas de los campos */
.form-col label {
  font-size: 1rem;                       /* Tamaño de fuente estándar */
  gap: 0.3rem;                           /* Espacio entre texto y campo */
}

/* Estilos generales para los inputs, selects y textarea */
.form-comment input,
.form-comment select,
.form-comment textarea {
  border-radius: 6px;                    /* Bordes redondeados */
  border: none;                          /* Sin borde por defecto */
  padding: 0.5rem;                       /* Espaciado interno */
  font-size: 1rem;                       /* Tamaño de fuente */
  margin-top: 0.2rem;                    /* Espacio arriba del campo */
  width: 100%;                           /* Ocupa todo el ancho de la columna */
  box-sizing: border-box;                /* Incluye padding en el tamaño */
}

/* Estilo específico para el textarea */
.form-comment textarea {
  min-height: 60px;                      /* Altura mínima */
  max-height: 140px;                     /* Altura máxima */
  resize: none;                         /* Sin opción de redimensionar */
}

/* Columna de acciones (botón y mensaje) */
.form-actions {
  align-items: flex-end;                 /* Alinea el botón al fondo */
  justify-content: flex-end;             /* Alinea el contenido a la derecha */
}

/* Estilo del botón de enviar */
.form-comment button {
  background: #d401b7;                   /* Fondo rosa */
  color: #fff;                           /* Texto blanco */
  border: none;                          /* Sin borde */
  border-radius: 6px;                    /* Bordes redondeados */
  padding: 0.7rem 1.2rem;                /* Espaciado interno */
  font-size: 1.1rem;                     /* Tamaño de fuente */
  cursor: pointer;                       /* Cursor de mano */
  margin-top: 0.5rem;                    /* Espacio arriba del botón */
  transition: background 0.2s;           /* Transición suave al pasar el mouse */
  width: 100%;                           /* Ocupa todo el ancho de la columna */
}

/* Efecto hover para el botón */
.form-comment button:hover {
  background: #743179;                   /* Cambia a morado oscuro */
}

/* Mensaje de confirmación o error */
.mensaje {
  margin-top: 0.7rem;                    /* Espacio arriba del mensaje */
  color: #ffd700;                        /* Color dorado */
  text-align: center;                    /* Centrado */
  font-size: 1rem;                       /* Tamaño de fuente */
}

/* Responsive: apila los campos en columna en pantallas pequeñas */
@media (max-width: 900px) {
  .form-fields-row {
    flex-direction: column;              /* Apila los campos verticalmente */
    gap: 0.7rem;                         /* Espacio entre campos */
    align-items: stretch;                /* Estira los campos */
  }
  .form-comment {
    width: 98vw;                         /* Ocupa casi todo el ancho */
    max-width: 100vw;                    /* No sobrepasa el ancho de la ventana */
  }
}
</style>
