<script setup>
//Componenete de la barra de navegación con el logo, enlaces y botón de inicio de sesión.

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUser, SignInButton, UserButton } from '@clerk/vue'
import LoginButton from './icons/LoginButton.vue'
import EditarPerfil from './EditarPerfil.vue'

const menuOpen = ref(false)
const scrolled = ref(false)
const notifications = ref([
  '¡Tienes un nuevo mensaje!',
  'Un usuario ha respondido a tu comentario.',
  'Tu perfil ha sido actualizado.',
])
const hasNotifications = computed(() => notifications.value.length > 0)
const showNotifications = ref(false)

const mostrarEditarPerfil = ref(false)

function abrirPerfil() {
  mostrarEditarPerfil.value = true
}

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  scrolled.value = window.scrollY > 10
}

const { user, isSignedIn } = useUser()
</script>

<template>
  <div :class="['navbar', { scrolled }]">
    <div class="navbar-logo">
      <a href="/">
        <img src="../assets/images/logo.svg" alt="Logo" width="50" height="50" />
      </a>
    </div>
    <button class="hamburger" @click="menuOpen = !menuOpen" aria-label="Abrir menú">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav class="navbar-links" :class="{ open: menuOpen }">
      <a href="#jugar" @click="menuOpen = false">Jugar</a>
      <a href="#como-jugar" @click="menuOpen = false">Cómo jugar</a>
      <a href="#comunidad" @click="menuOpen = false">Comunidad</a>
    </nav>
    <div class="navbar-login">
      <template v-if="isSignedIn">
        <UserButton :user="user" showName />
        <button class="clerk-custom-action" @click="abrirPerfil">✏️ Editar perfil</button>
        <EditarPerfil
          v-if="mostrarEditarPerfil"
          @close="mostrarEditarPerfil = false"
          @perfil-actualizado="mostrarEditarPerfil = false"
        />
      </template>
      <template v-else>
        <SignInButton>
          <LoginButton id="sign-in-button" />
        </SignInButton>
      </template>
    </div>
    <!-- Botón de notificaciones -->
    <div class="navbar-notifications" @click="toggleNotifications">
      <span class="notification-icon">🔔</span>
      <span v-if="hasNotifications" class="notification-dot"></span>
      <div v-if="showNotifications" class="notifications-dropdown">
        <div v-if="notifications.length === 0" class="notification-empty">
          No hay notificaciones
        </div>
        <div v-for="(notif, idx) in notifications.slice(0, 5)" :key="idx" class="notification-item">
          {{ notif }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background 0.8s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  padding: 10px 30px;
}
.navbar.scrolled {
  background: linear-gradient(to bottom, rgba(40, 11, 87, 0.8), rgb(116, 49, 121), transparent);
}
.navbar-logo img {
  background-color: white;
  border-radius: 50%;
  margin-left: 30px;
}
.navbar-links {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-left: auto;
}
.navbar-links a {
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 2.5px 8px;
  border: solid 1px transparent;
  border-radius: 5px;
}
.navbar-links a:hover {
  background-color: rgb(116, 49, 121);
  transition: color 0.3s ease;
  border: solid 1px white;
  border-radius: 5px;
  padding: 2.5px 8px;
}
#sign-in-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.navbar-login {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.navbar-notifications {
  position: relative;
  margin-right: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
}
.notification-icon {
  font-size: 1.7rem;
  color: #fff;
}
.notification-dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 13px;
  height: 13px;
  background: #e53935;
  border-radius: 50%;
  border: 2px solid #fff;
}
.notifications-dropdown {
  position: absolute;
  top: 36px;
  right: 0;
  background: #fff;
  color: #743179;
  min-width: 220px;
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
  z-index: 2000;
  padding: 10px 0;
}
.notification-item {
  padding: 8px 18px;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}
.notification-item:last-child {
  border-bottom: none;
}
.notification-empty {
  padding: 12px 18px;
  color: #aaa;
  text-align: center;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}
.hamburger span {
  width: 28px;
  height: 3px;
  background: white;
  border-radius: 2px;
  display: block;
}
.clerk-custom-action {
  background: none;
  border: none;
  color: #b76dbd;
  font-size: 0.9rem;
  padding: 4px 10px;
  width: auto;
  text-align: left;
  cursor: pointer;
  border-radius: 6px;
  margin-left: 8px;
  transition: background 0.2s;
}
.clerk-custom-action:hover {
  background: #f3e6fa;
}

/* Responsive para móvil */
@media (max-width: 700px) {
  .navbar {
    position: relative;
    padding: 8px 8px;
  }
  .navbar-links {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(116, 49, 121, 0.92);
    width: 90vw;
    padding: 24px 0 18px 0;
    gap: 22px;
    align-items: center;
    border-radius: 12px;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  }
  .navbar-links.open {
    display: flex;
  }
  .hamburger {
    display: flex;
  }
  .navbar-login {
    margin-left: 0;
  }
  .navbar-logo img {
    margin-left: 0;
    width: 38px;
    height: 38px;
  }
  .notification-icon {
    font-size: 1.2rem;
  }
}
@media (max-width: 1024px) {
  .navbar {
    position: relative;
    padding: 10px 10px;
  }
  .navbar-links {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(116, 49, 121, 0.92);
    width: 90vw;
    padding: 24px 0 18px 0;
    gap: 22px;
    align-items: center;
    border-radius: 12px;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  }
  .navbar-links.open {
    display: flex;
  }
  .hamburger {
    display: flex;
  }
  .navbar-login {
    margin-left: 0;
  }
}
</style>
