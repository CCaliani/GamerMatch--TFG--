// Composable para gestionar la búsqueda y filtrado de jugadores desde la API.

import { ref } from 'vue';

export function useJugadoresApi() {
  const jugadores = ref([]);
  const loading = ref(false);
  const error = ref('');

  // Cuenta cuántos filtros coinciden entre el jugador y los filtros aplicados
  function contarCoincidencias(jugador, filtros) {
    let coincidencias = 0;
    Object.entries(filtros).forEach(([key, value]) => {
      if (value && jugador[key] && jugador[key].toString().toLowerCase() === value.toString().toLowerCase()) {
        coincidencias++;
      }
    });
    return coincidencias;
  }

  // Busca jugadores en la API aplicando los filtros y ordena por coincidencias
  async function buscarJugadores(filtros) {
    loading.value = true;
    error.value = '';
    try {
      const params = new URLSearchParams();
      Object.entries(filtros).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios?${params.toString()}`);
      if (!res.ok) throw new Error('Error al buscar jugadores');
      const data = await res.json();

      const lista = data.data || data;
      lista.forEach(j => j.coincidencias = contarCoincidencias(j, filtros));
      jugadores.value = lista.sort((a, b) => b.coincidencias - a.coincidencias);
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { jugadores, loading, error, buscarJugadores };
}
