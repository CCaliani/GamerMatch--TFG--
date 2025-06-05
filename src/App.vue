<script setup>
// Componente principal de la aplicación GamerMatch.
// Aquí se importan y utilizan los componentes globales de la plataforma.

import CustomComments from './components/CustomComments.vue'
import CustomFooter from './components/CustomFooter.vue'
import MainContent from './components/MainContent.vue'
import NavBar from './components/NavBar.vue'
import WindowsGame from './components/WindowsGame.vue'
import LiveChat from './components/LiveChat.vue'
import CookieConsent from './components/CookieConsent.vue'
import { watch } from 'vue'
import { useUser } from '@clerk/vue'

const { user, isSignedIn } = useUser()

async function syncUsuarioConBackend() {
  if (!user.value) return
  await fetch('http://localhost:3000/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clerkUserId: user.value.id,
      nombre: user.value.firstName || user.value.username || 'SinNombre',
      password: 'clerk',
      edad: user.value.publicMetadata?.edad || 18,
      idioma: user.value.publicMetadata?.idioma || 'Español',
      region: user.value.publicMetadata?.region || 'Europa',
      plataformaFavorita: user.value.publicMetadata?.plataformaFavorita || 'PC',
      juegoFavorito: user.value.publicMetadata?.juegoFavorito || 'FIFA',
      email: user.value.emailAddress || 'sinemail@correo.com',
      avatar: user.value.profileImageUrl || '',
    }),
  })
}

// Llama a la función cuando el usuario inicie sesión
watch(isSignedIn, (nuevoValor) => {
  if (nuevoValor) syncUsuarioConBackend()
})
</script>

<template>
  <!--Encabezado y barra de navegación-->
  <header>
    <NavBar />
  </header>
  <main>
    <!-- Sección principal de la aplicación -->
    <section id="video">
      <MainContent />
    </section>

    <div class="main-flex">
      <!-- Sección de búsqueda de jugadores -->
      <section id="jugar">
        <WindowsGame />
      </section>

      <section id="como-jugar">
        <div class="instructions-text">
          <div class="instructions-col">
            <h2>Buscar compañer@s</h2>
            <ul>
              <li>
                Usa los filtros para encontrar jugadores afines a tus intereses o juegos favoritos.
              </li>
              <li>Envía una solicitud a quien te gustaría conocer y empieza a chatear.</li>
              <li>
                Después de jugar o chatear, podréis valorar la experiencia y dar feedback sobre
                vuestro compañero.
              </li>
            </ul>
          </div>
          <div class="instructions-col">
            <h2>Normas de la comunidad</h2>
            <ul>
              <li>
                Respeta siempre a los demás jugadores. No se permite lenguaje ofensivo ni actitudes
                tóxicas.
              </li>
              <li>
                El chat es para hablar sobre juegos, estrategias o quedar para jugar. ¡Evita el spam
                o mensajes fuera de lugar!
              </li>
              <li>
                Si alguien rompe las normas, puede ser expulsado de la plataforma. Si ves algo fuera
                de lugar, repórtalo para que podamos actuar.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <section id="comunidad">
      <!-- Sección de comentarios y valoraciones -->
      <CustomComments />
    </section>
  </main>
  <!--Sección del caht en vivo y consentimiento de cookies-->
  <LiveChat />
  <CookieConsent />
  <footer>
    <CustomFooter />
  </footer>
</template>

<style scoped>
html,
body,
#app {
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

main {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
}

.main-flex {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.instructions-text {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 15px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  color: white;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

.instructions-col {
  flex: 1 1 0;
  min-width: 0;
  max-width: 480px;
  box-sizing: border-box;
}

.instructions-col h2 {
  margin-top: 0.5em;
  color: #fff;
}

.instructions-col ul {
  margin-bottom: 1.2em;
  padding-left: 1.2em;
}

.instructions-col li {
  margin-bottom: 0.5em;
  color: #fff;
  opacity: 0.9;
}

/* Responsive para móviles */
@media (max-width: 900px) {
  main {
    max-width: 100%;
    padding: 0 2vw;
  }
  .main-flex {
    max-width: 100%;
    padding: 0;
  }
  .instructions-text {
    flex-direction: column;
    gap: 16px;
    padding: 8px 2vw;
    max-width: 100%;
  }
  .instructions-col {
    max-width: 100%;
    min-width: 0;
  }
}
@media (max-width: 700px) {
  main {
    max-width: 100%;
    padding: 0 1vw;
  }
  .main-flex {
    max-width: 100%;
    padding: 0;
  }
  .instructions-text {
    padding: 4px 1vw;
    gap: 8px;
    border-radius: 8px;
    max-width: 100%;
  }
  .instructions-col {
    min-width: 0;
    max-width: 100vw;
  }
}
</style>
