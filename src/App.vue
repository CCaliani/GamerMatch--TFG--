<script setup>
import CustomComments from './components/CustomComments.vue';
import CustomFooter from './components/CustomFooter.vue';
import FormComment from './components/FormComment.vue';
import MainContent from './components/MainContent.vue'
import NavBar from './components/NavBar.vue';
import WindowsGame from './components/WindowsGame.vue';
import LiveChat from './components/LiveChat.vue';
import CookieConsent from './components/CookieConsent.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
        <section id="video">
    <MainContent />
        </section>

    <div class="main-flex">
      <section id="jugar">
    <WindowsGame />
      </section>

      <section id="como-jugar">
        <div class="instructions-text">
          <div class="instructions-col">
            <h2>Buscar compañer@s</h2>
            <ul>
              <li>Usa los filtros para encontrar jugadores afines a tus intereses o juegos favoritos.</li>
              <li>Envía una solicitud a quien te gustaría conocer y empieza a chatear.</li>
              <li>Después de jugar o chatear, podréis valorar la experiencia y dar feedback sobre vuestro compañero.</li>
            </ul>
          </div>
          <div class="instructions-col">
            <h2>Normas de la comunidad</h2>
            <ul>
              <li>Respeta siempre a los demás jugadores. No se permite lenguaje ofensivo ni actitudes tóxicas.</li>
              <li>El chat es para hablar sobre juegos, estrategias o quedar para jugar. ¡Evita el spam o mensajes fuera de lugar!</li>
              <li>Si alguien rompe las normas, puede ser expulsado de la plataforma. Si ves algo fuera de lugar, repórtalo para que podamos actuar.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
        <section id="comunidad">
              <CustomComments />
    <FormComment @nuevo-comentario="addComment" />
        </section>


  </main>
      <LiveChat />
      <CookieConsent />
  <footer>
    <CustomFooter />
  </footer>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  box-sizing: border-box;
}

main {
  flex: 1 1 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
}

.instructions-col {
  flex: 1 1 0;
  min-width: 240px;
  max-width: 480px;
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
  .instructions-text {
    flex-direction: column;
    gap: 16px;
  }
  .instructions-col {
    max-width: 100%;
  }
}
</style>
