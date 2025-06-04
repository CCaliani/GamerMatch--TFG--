<!-- Componente de edición de perfil. -->

<script setup>
import { ref, onMounted } from 'vue'
import { useUser } from '@clerk/vue'

const emit = defineEmits(['close', 'perfil-actualizado'])
const { user } = useUser()

const descripcion = ref('')
const juegoFavorito = ref('')
const plataformaFavorita = ref('')
const idioma = ref('')
const region = ref('')
const mensaje = ref('')
const cargando = ref(false)

const plataformas = ['PlayStation', 'Xbox', 'PC', 'Nintendo Switch', 'Móvil']
const idiomas = ['Español', 'Inglés', 'Alemán', 'Italiano', 'Francés']
const regiones = ['Europa', 'Asia', 'América', 'Oceanía', 'África']

// Cargar datos del usuario al abrir el modal
onMounted(() => {
  if (user.value) {
    descripcion.value = user.value.publicMetadata.descripcion || ''
    juegoFavorito.value = user.value.publicMetadata.juegoFavorito || ''
    plataformaFavorita.value = user.value.publicMetadata.plataformaFavorita || ''
    idioma.value = user.value.publicMetadata.idioma || ''
    region.value = user.value.publicMetadata.region || ''
  }
})

async function guardarPerfil() {
  if (!descripcion.value || !plataformaFavorita.value || !idioma.value || !region.value) {
    mensaje.value = 'Por favor, completa los campos obligatorios.'
    return
  }
  if (descripcion.value.length > 300) {
    mensaje.value = 'La descripción no puede superar los 300 caracteres.'
    return
  }
  cargando.value = true
  try {
    await user.value.update({
      publicMetadata: {
        descripcion: descripcion.value,
        juegoFavorito: juegoFavorito.value,
        plataformaFavorita: plataformaFavorita.value,
        idioma: idioma.value,
        region: region.value,
      },
    })
    mensaje.value = 'Perfil actualizado'
    emit('perfil-actualizado')
    setTimeout(() => emit('close'), 1000)
  } catch {
    mensaje.value = 'Error al actualizar perfil'
  } finally {
    cargando.value = false
  }
}
</script>

<template>
  <div class="modal-overlay">
    <div class="editar-perfil-modal">
      <h2>Editar perfil</h2>
      <form @submit.prevent="guardarPerfil">
        <label
          >Descripción:*
          <textarea
            v-model="descripcion"
            :disabled="cargando"
            required
            maxlength="300"
            rows="3"
            placeholder="Máximo 300 caracteres"
          />
          <small>{{ descripcion.length }}/300</small>
        </label>
        <label
          >Juego favorito:
          <input v-model="juegoFavorito" type="text" :disabled="cargando" />
        </label>
        <label
          >Plataforma favorita:*
          <select v-model="plataformaFavorita" :disabled="cargando" required>
            <option disabled value="">Selecciona una plataforma</option>
            <option v-for="p in plataformas" :key="p" :value="p">{{ p }}</option>
          </select>
        </label>
        <label
          >Idioma:*
          <select v-model="idioma" :disabled="cargando" required>
            <option disabled value="">Selecciona un idioma</option>
            <option v-for="i in idiomas" :key="i" :value="i">{{ i }}</option>
          </select>
        </label>
        <label
          >Región:*
          <select v-model="region" :disabled="cargando" required>
            <option disabled value="">Selecciona una región</option>
            <option v-for="r in regiones" :key="r" :value="r">{{ r }}</option>
          </select>
        </label>
        <div class="modal-actions">
          <button type="submit" :disabled="cargando">Guardar</button>
          <button type="button" @click="$emit('close')" :disabled="cargando">Cancelar</button>
        </div>
        <div v-if="mensaje" :style="{ color: mensaje === 'Perfil actualizado' ? 'green' : 'red' }">
          {{ mensaje }}
        </div>
        <small style="color: #888; display: block; margin-top: 10px; text-align: right">
          Los campos con * son obligatorios.
        </small>
      </form>
      <div v-if="cargando" class="modal-cargando">Guardando...</div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(40, 11, 87, 0.45);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.editar-perfil-modal {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(40, 11, 87, 0.18);
  padding: 32px 28px 24px 28px;
  min-width: 320px;
  max-width: 95vw;
  width: 370px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  animation: modalIn 0.18s;
  max-height: 90vh; /* Limita la altura máxima al 90% de la ventana */
  overflow-y: auto; /* Habilita el scroll interno vertical */
}
@keyframes modalIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.editar-perfil-modal h2 {
  margin-bottom: 10px;
  color: #743179;
  text-align: center;
}
.editar-perfil-modal label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #743179;
  margin-bottom: 10px;
  gap: 4px;
}
.editar-perfil-modal input,
.editar-perfil-modal textarea,
.editar-perfil-modal select {
  border: 1px solid #e0d6f5;
  border-radius: 6px;
  padding: 7px 10px;
  font-size: 1rem;
  margin-top: 2px;
  background: #f9f6fd;
  color: #743179;
  resize: none;
}
.editar-perfil-modal small {
  color: #aaa;
  font-size: 0.92em;
  align-self: flex-end;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}
.editar-perfil-modal button {
  background: #743179;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.editar-perfil-modal button[type='button'] {
  background: #e0d6f5;
  color: #743179;
}
.editar-perfil-modal button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.modal-cargando {
  text-align: center;
  color: #743179;
  margin-top: 10px;
}
</style>
