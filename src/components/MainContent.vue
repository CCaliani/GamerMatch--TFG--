<script setup>
//Contenido principal de la página de inicio, sin componentes adicionales.
</script>

<template>
  <div class="welcome-text">
    <h1>Empieza tu experiencia con un nuevo compañero de juegos</h1>
    <p>Encuentra jugadores a tu gusto para disfrutar de tus juegos favoritos</p>
  </div>

  <div class="game-instructions">
    <img src="../assets/images/Como-jugar.jpg" alt="example" width="150px" height="150px"/>
  </div>
</template>

<style scoped>
.welcome-text {
  text-align: center;
  margin-top: 100px;
}
.welcome-text h1 {
  font-size: 2.5rem;
  color: white;
}
.welcome-text p {
  font-size: 1.2rem;
  color: white;
  opacity: 0.8;
}

.game-instructions {
  margin: 30px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  max-width: 1100px;
  width: 95%;
  display: flex;
  align-items: center;

}

.game-instructions img {
  max-width: 500px;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
}



/* Responsive: en móvil, vuelve a columna */
@media (max-width: 700px) {
  .game-instructions {
    flex-direction: column;
    gap: 18px;
    text-align: center;
  }
  .instructions-text {
    text-align: center;
  }
}
</style>
