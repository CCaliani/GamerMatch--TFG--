<script setup>
// Componente para enviar un nuevo comentario y valoración.

import { ref } from 'vue'

const emit = defineEmits(['nuevo-comentario'])

const nombre = ref('')
const valoracion = ref('')
const comentario = ref('')
const mensaje = ref('')

function enviarComentario() {
  if (!nombre.value || !valoracion.value || !comentario.value) {
    mensaje.value = 'Por favor, completa todos los campos.'
    return
  }
  emit('nuevo-comentario', {
    user: nombre.value,
    rating: valoracion.value,
    text: comentario.value,
    id: Date.now(),
  })
  mensaje.value = '¡Gracias por tu comentario!'
  nombre.value = ''
  valoracion.value = ''
  comentario.value = ''
  setTimeout(() => (mensaje.value = ''), 2000)
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
          <textarea
            v-model="comentario"
            required
            maxlength="120"
            placeholder="¿Qué opinas de la web?"
          ></textarea>
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
.form-comment {
  background: rgba(255, 255, 255, 0.08);
  padding: 2rem 1.5rem;
  border-radius: 16px;
  max-width: 100vw;
  width: 70vw;
  margin: 3rem auto 2rem auto;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  box-sizing: border-box;
}
.form-title {
  align-self: flex-start;
}
.form-title h2 {
  font-size: 1.4rem;
}
.form-fields-row {
  display: flex;
  flex-direction: column 4;
  gap: 1.1rem;
  align-items: center;
  width: 100%;
}
.form-col {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-width: 0;
  gap: 0.3rem;
}
.form-col label {
  font-size: 1rem;
  gap: 0.3rem;
}
.form-comment input,
.form-comment select,
.form-comment textarea {
  border-radius: 6px;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.2rem;
  width: 100%;
  box-sizing: border-box;
}
.form-comment textarea {
  min-height: 60px;
  max-height: 140px;
  resize: none;
}
.form-actions {
  align-items: flex-end;
  justify-content: flex-end;
}
.form-comment button {
  background: #d401b7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
  width: 100%;
}
.form-comment button:hover {
  background: #743179;
}
.mensaje {
  margin-top: 0.7rem;
  color: #ffd700;
  text-align: center;
  font-size: 1rem;
}
@media (max-width: 900px) {
  .form-fields-row {
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
  }
  .form-comment {
    width: 100vw;
    max-width: 100vw;
  }
}
@media (max-width: 700px) {
  .form-comment {
    width: 98vw;
    max-width: 100vw;
    margin: 1.5rem auto 0 auto;
    border-radius: 8px;
  }
}
</style>
