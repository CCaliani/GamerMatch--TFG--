<script setup>
// Componente de botón personalizado reutilizable.
</script>

<template>
  <button
    class="custom-btn"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.custom-btn {
  margin-top: 10px;
  background: #d401b7;
  color: #fff;
  font-size: 1.2rem;
  padding: 14px 32px;
  border: solid 1px transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.custom-btn:hover {
  color: white;
  transition: color 0.3s ease;
  border: solid 1px white;
  background-color: rgb(116, 49, 121);
}
</style>
