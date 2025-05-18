<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const comments = ref([
  { id: 1, user: 'Ana', rating: 5, text: '¡Excelente plataforma para encontrar compañeros de juego!' },
  { id: 2, user: 'Luis', rating: 4, text: 'Muy útil y fácil de usar.' },
  { id: 3, user: 'Sara', rating: 5, text: 'Me encanta la comunidad.' },
  { id: 4, user: 'Pedro', rating: 3, text: 'Podría mejorar la búsqueda.' },
  { id: 5, user: 'Marta', rating: 5, text: 'He hecho muchos amigos aquí.' },
  { id: 6, user: 'Javier', rating: 4, text: 'Buena experiencia en general.' },
  { id: 7, user: 'Clara', rating: 5, text: 'Me gusta la variedad de juegos.' },
  { id: 8, user: 'David', rating: 4, text: 'Fácil de navegar y encontrar jugadores.' },
  { id: 9, user: 'Laura', rating: 5, text: 'Gran comunidad y soporte.' },
]);

const current = ref(0);
const isSliding = ref(false);
const slideDirection = ref('left');

const visibleComments = computed(() => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(comments.value[(current.value + i) % comments.value.length]);
  }
  return arr;
});

function next() {
  slideDirection.value = 'left';
  slide();
  setTimeout(() => {
    current.value = (current.value + 1) % comments.value.length;
    isSliding.value = false;
  }, 500);
}
function prev() {
  slideDirection.value = 'right';
  slide();
  setTimeout(() => {
    current.value = (current.value - 1 + comments.value.length) % comments.value.length;
    isSliding.value = false;
  }, 500);
}

function slide() {
  isSliding.value = true;

}

// Auto-slide cada 10 segundos
let interval = null;
onMounted(() => {
  interval = setInterval(next, 10000);
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>


<template>
  <div class="comments-section">
    <button class="arrow left" @click="prev">&#8592;</button>
    <div
      class="comments-carousel"
      :class="{
        'slide-left': isSliding && slideDirection === 'left',
        'slide-right': isSliding && slideDirection === 'right'
      }"
    >
      <div
        class="comment"
        v-for="comment in visibleComments"
        :key="comment.id"
      >
        <div class="comment-header">
          <span class="comment-user">{{ comment.user }}</span>
          <span class="comment-rating">⭐ {{ comment.rating }}</span>
        </div>
        <div class="comment-body">{{ comment.text }}</div>
      </div>
    </div>
    <button class="arrow right" @click="next">&#8594;</button>
  </div>
</template>



<style scoped>
.comments-section {
  width: 100vw;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(156deg, #743179 33%, #200019 66%, #d401b7 100%);
  padding: 2.5rem 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  border-radius: 16px;
}

.comments-carousel {
  display: flex;
  gap: 2.5rem;
  width: 70vw;
  justify-content: center;
  align-items: stretch;
  transition: transform 0.5s cubic-bezier(.77,0,.18,1);
  will-change: transform;
}

/* Desliza a la izquierda */
.comments-carousel.slide-left {
  transform: translateX(15%);
}
/* Desliza a la derecha */
.comments-carousel.slide-right {
  transform: translateX(-15%);
}
/* Estado normal */
.comments-carousel:not(.slide-left):not(.slide-right) {
  transform: translateX(0);
}

.comment {
  background: rgba(32,0,25,0.80);
  border-radius: 18px;
  padding: 2.2rem 1.8rem;
  min-width: 320px;
  max-width: 420px;
  flex: 1 1 0;
  color: #fff;
  box-shadow: 0 2px 18px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.35rem;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.25rem;
}

.comment-user {
  font-size: 1.25rem;
}

.comment-rating {
  color: #ffd700;
  font-size: 1.25rem;
}

.comment-body {
  font-size: 1.18rem;
  opacity: 0.97;
  margin-top: 0.5rem;
}

.arrow {
  background: rgba(247, 218, 218, 0.548);
  border: none;
  color: #743179;
  font-size: 2.5rem;
  cursor: pointer;
  padding: 0.7rem 1.1rem;
  border-radius: 50%;
  margin: 0 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  transition: background 0.2s, color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  min-width: 64px;
  aspect-ratio: 1/1;
}
.arrow:hover {
  background: #fff;
  color: #d401b7;
  transform: scale(1.08);
}

@media (max-width: 900px) {
  .comments-carousel {
    width: 98vw;
    gap: 1rem;
  }
  .comment {
    min-width: 180px;
    max-width: 220px;
    padding: 1.2rem 0.7rem;
    font-size: 1rem;
  }
  .arrow {
    font-size: 1.6rem;
    padding: 0.5rem 0.7rem;
    margin: 0 0.5rem;
    height: 40px;
    min-width: 40px;
  }
}
</style>
