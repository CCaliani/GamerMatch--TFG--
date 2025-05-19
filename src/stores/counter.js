// Pinia store para gestionar un contador simple con Vue 3.

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Define el store 'counter'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
