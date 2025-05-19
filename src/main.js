// Punto de entrada principal de la aplicación Vue.
// Aquí se importan los estilos globales, se configura Pinia para el estado global
// y Clerk para la autenticación, y se monta el componente raíz App.

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { clerkPlugin } from '@clerk/vue'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
})


app.mount('#app')
