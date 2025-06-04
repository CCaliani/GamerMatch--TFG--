<!--Componente del chat en vivo-->
<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'
import { io } from 'socket.io-client'

// No generes usuario invitado automáticamente
const socket = io('http://localhost:3000')

const isOpen = ref(false)
const input = ref('')
const messages = ref([])
const hasNotification = ref(false)

// El usuario actual debe venir de tu sistema de login o invitaciones aceptadas
const myId = ref(null)
const user = ref('')
const myStatus = ref('disponible')

// Solo usuarios conectados, recibidos del backend
const users = ref([])

// Aquí deberías tener la lógica para saber a quién puedes escribir (usuarios que te han aceptado)
const acceptedUsers = computed(() =>
  users.value.filter(
    (u) => u.status === 'disponible' && u.id !== myId.value && u.invitationAccepted,
  ),
)

const selectedUser = ref(null) // Usuario seleccionado para chat privado

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasNotification.value = false
    nextTick(() => {
      scrollToBottom()
    })
  }
}

function sendMessage() {
  if (input.value.trim() && selectedUser.value) {
    socket.emit('chat-message', {
      user: user.value,
      text: input.value,
      to: selectedUser.value.name,
    })
    input.value = ''
  }
}

function scrollToBottom() {
  const el = document.querySelector('.chat-messages')
  if (el) el.scrollTop = el.scrollHeight
}

function getUserStatus(name) {
  const u = users.value.find((u) => u.name === name)
  return u ? u.status : 'desconectado'
}

function selectUser(u) {
  if (u.id === myId.value) {
    selectedUser.value = null // Si te seleccionas a ti, vuelves al chat general
  } else {
    selectedUser.value = u
  }
}

// Filtra mensajes según usuario seleccionado
const filteredMessages = computed(() => {
  if (!selectedUser.value) return []
  return messages.value.filter(
    (msg) =>
      (msg.user === user.value && msg.to === selectedUser.value.name) ||
      (msg.user === selectedUser.value.name && msg.to === user.value),
  )
})

onMounted(() => {
  // Aquí deberías obtener el usuario real de tu sistema de login o invitaciones
  // Por ejemplo:
  // myId.value = store.state.user.id
  // user.value = store.state.user.name

  // Solo emite user-join si el usuario está autenticado
  if (myId.value && user.value) {
    socket.emit('user-join', {
      id: myId,
      name: user,
      status: myStatus.value,
      accepted: [], // Aquí debes poner el array de ids aceptados
    })
  }

  socket.on('chat-message', (msg) => {
    messages.value.push(msg)
    if (!isOpen.value) {
      hasNotification.value = true
    }
    nextTick(scrollToBottom)
  })

  socket.on('users-update', (usuarios) => {
    users.value = usuarios
  })

  // Cambia el estado y se notifica
  watch(myStatus, (newStatus) => {
    if (myId.value && user.value) {
      socket.emit('status-update', { id: myId.value, name: user.value, status: newStatus })
    }
  })
})

onUnmounted(() => {
  socket.off('chat-message')
  socket.off('users-update')
})
</script>

<template>
  <div class="chat-widget" :class="{ open: isOpen }">
    <div class="chat-header" @click="toggleChat">
      💬 Chat en vivo
      <span v-if="hasNotification && !isOpen" class="chat-notification"></span>
    </div>
    <div v-if="isOpen" class="chat-body">
      <div class="chat-users-list">
        <div class="chat-users">
          <div
            v-for="u in acceptedUsers"
            :key="u.id"
            class="chat-user"
            :class="{ selected: selectedUser && selectedUser.id === u.id }"
            @click="selectUser(u)"
          >
            <span
              class="status-dot"
              :class="{
                available: u.status === 'disponible',
                playing: u.status === 'jugando',
                offline: u.status === 'desconectado',
              }"
            ></span>
            {{ u.name }} <span v-if="u.id === myId">(Tú)</span>
          </div>
        </div>
      </div>
      <div class="chat-messages" ref="messagesEnd">
        <div v-for="(msg, idx) in filteredMessages" :key="idx" class="chat-message">
          <span class="user">
            <span
              class="status-dot"
              :class="{
                available: getUserStatus(msg.user) === 'disponible',
                playing: getUserStatus(msg.user) === 'jugando',
                offline: getUserStatus(msg.user) === 'desconectado',
              }"
            ></span>
            {{ msg.user }}<span v-if="msg.to"> → {{ msg.to }}</span
            >:
          </span>
          <span class="text">{{ msg.text }}</span>
        </div>
      </div>
      <form class="chat-input" @submit.prevent="sendMessage">
        <div class="status-row">
          <label class="status-label">
            Estado:
            <select v-model="myStatus" class="status-select">
              <option value="disponible">Disponible</option>
              <option value="jugando">Jugando</option>
              <option value="desconectado">Desconectado</option>
            </select>
          </label>
        </div>
        <div class="input-row">
          <input
            v-model="input"
            type="text"
            placeholder="Escribe un mensaje..."
            required
            autocomplete="off"
            :disabled="!selectedUser"
          />
          <button type="submit" :disabled="!selectedUser">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 320px;
  background: rgba(40, 11, 87, 0.98);
  border-radius: 16px 16px 8px 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  z-index: 2000;
  transition:
    height 0.3s,
    box-shadow 0.3s;
  height: 48px;
  cursor: pointer;
}
.chat-widget.open {
  height: 520px;
  cursor: default;
}
.chat-header {
  background: #d401b7;
  color: #fff;
  padding: 12px 18px;
  font-weight: bold;
  font-size: 1.1rem;
  border-bottom: 1px solid #fff2;
  cursor: pointer;
  position: relative;
}
.chat-notification {
  display: inline-block;
  margin-left: 10px;
  width: 12px;
  height: 12px;
  background: #ffd700;
  border-radius: 50%;
  box-shadow: 0 0 6px #ffd700;
  vertical-align: middle;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 6px #ffd700;
  }
  50% {
    box-shadow: 0 0 16px #ffd700;
  }
  100% {
    box-shadow: 0 0 6px #ffd700;
  }
}
.chat-body {
  display: flex;
  flex-direction: column;
  height: 472px;
  background: transparent;
}
.chat-users-list {
  max-height: 80px;
  overflow-y: auto;
  margin-bottom: 8px;
}
.chat-users {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.98rem;
}
.chat-user {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  padding: 2px 8px;
  cursor: pointer;
}
.chat-user.selected {
  background: #ffd70044;
  font-weight: bold;
}
.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
  background: #ccc;
}
.status-dot.available {
  background: #3ec300;
}
.status-dot.playing {
  background: #ffd700;
}
.status-dot.offline {
  background: #d4011a;
}
.chat-messages {
  flex: 1 1 0;
  overflow-y: auto;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  margin-bottom: 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
}
.chat-message {
  margin-bottom: 8px;
}
.user {
  font-weight: bold;
  color: #ffd700;
  margin-right: 6px;
}
.chat-input {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #fff2;
  padding: 8px;
  background: #fff1;
  gap: 4px;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-label {
  font-size: 0.78rem;
  color: #fff;
  gap: 4px;
  display: flex;
  align-items: center;
  margin-right: 6px;
  white-space: nowrap;
}

.status-select {
  border-radius: 6px;
  border: none;
  padding: 1px 4px;
  font-size: 0.78rem;
  background: #fff;
  color: #333;
  margin-left: 4px;
  min-width: 80px;
  height: 22px;
}

.input-row input {
  flex: 1 1 0;
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 1rem;
  outline: none;
}

.input-row button {
  background: #d401b7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.input-row button:hover {
  background: #743179;
}

.my-status {
  margin: 8px 0 4px 0;
  font-size: 0.95rem;
  color: #fff;
}
</style>
