<!-- Componente para mostrar el aviso de cookies y gestionar el consentimiento del usuario. -->

<script setup>
import { ref, onMounted } from 'vue';

const COOKIE_KEY = 'cookie_consent';
const show = ref(false);

onMounted(() => {
  show.value = !localStorage.getItem(COOKIE_KEY);
});

function acceptCookies() {
  localStorage.setItem(COOKIE_KEY, 'accepted');
  show.value = false;
}
</script>

<template>
  <div v-if="show" class="cookie-consent">
    <span>
      Utilizamos cookies para mejorar tu experiencia. Consulta nuestra
      <a href="#privacidad" target="_blank">política de privacidad</a>.
    </span>
    <button @click="acceptCookies">Aceptar</button>
  </div>
</template>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: rgba(40, 11, 87, 0.8);
  color: #fff;
  padding: 18px 16px 14px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  z-index: 3000;
  font-size: 1rem;
  box-shadow: 0 -2px 16px rgba(0,0,0,0.18);
}
.cookie-consent a {
  color: #d401b7;
  text-decoration: underline;
}
.cookie-consent button {
  background: #d401b7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.cookie-consent button:hover {
  background: #743179;
}
</style>
