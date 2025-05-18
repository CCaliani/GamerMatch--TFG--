<script setup>
import { ref, onMounted } from 'vue';
import { useUser } from '@clerk/vue';

const emit = defineEmits(['close']);
const { user } = useUser();

const descripcion = ref('');
const avatar = ref('');
const juegosFavoritos = ref('');
const plataformaFavorita = ref('');
const idioma = ref('');
const region = ref('');
const mensaje = ref('');
const cargando = ref(false);

// Cargar datos del usuario al abrir el modal
onMounted(async () => {
  cargando.value = true;
  try {
    const token = localStorage.getItem('token');
    // Usa el id de Clerk como userId
    const userId = user.value?.id;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      descripcion.value = data.descripcion || '';
      avatar.value = data.avatar || '';
      juegosFavoritos.value = data.juegosFavoritos || '';
      plataformaFavorita.value = data.plataformaFavorita || '';
      idioma.value = data.idioma || '';
      region.value = data.region || '';
    }
  } catch {
    mensaje.value = 'Error al cargar perfil';
  } finally {
    cargando.value = false;
  }
});

async function guardarPerfil() {
  if (!descripcion.value || !plataformaFavorita.value || !idioma.value) {
    mensaje.value = 'Por favor, completa los campos obligatorios.';
    return;
  }
  cargando.value = true;
  try {
    const token = localStorage.getItem('token');
    const userId = user.value?.id;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        descripcion: descripcion.value,
        avatar: avatar.value,
        juegosFavoritos: juegosFavoritos.value,
        plataformaFavorita: plataformaFavorita.value,
        idioma: idioma.value,
        region: region.value
      })
    });
    if (res.ok) {
      mensaje.value = 'Perfil actualizado';
      setTimeout(() => emit('close'), 1000);
    } else {
      mensaje.value = 'Error al actualizar perfil';
    }
  } catch {
    mensaje.value = 'Error al actualizar perfil';
  } finally {
    cargando.value = false;
  }
}
</script>

<template>
  <div class="editar-perfil-modal">
    <h2>Editar perfil</h2>
    <form @submit.prevent="guardarPerfil">
      <label>Descripción:
        <textarea v-model="descripcion" />
      </label>
      <label>Avatar (URL):
        <input v-model="avatar" type="text" />
      </label>
      <label>Juegos favoritos:
        <input v-model="juegosFavoritos" type="text" />
      </label>
      <label>Plataforma favorita:
        <input v-model="plataformaFavorita" type="text" />
      </label>
      <label>Idioma:
        <input v-model="idioma" type="text" />
      </label>
      <label>Región:
        <input v-model="region" type="text" />
      </label>
      <button type="submit" :disabled="cargando">Guardar</button>
      <button type="button" @click="$emit('close')">Cancelar</button>
      <div v-if="mensaje">{{ mensaje }}</div>
    </form>
  </div>
</template>
