<template>
  <div class="d-flex flex-column vh-100">
    <!-- header -->
    <header class="row-header text-center text-white"></header>

    <!-- big box -->
    <div class="glass-card mb-3 flex-shrink-0" style="height: 200px"></div>

    <!-- blocks container -->
    <div class="blocks-container flex-grow-1 overflow-auto px-2" style="overflow-x: hidden">
      <div v-if="tasks.length > 0" class="row g-3 m-0">
        <div class="col-6" v-for="task in tasks" :key="task.id">
          <TaskCard
            :task="task"
            :selected="selectedTaskId === task.id"
            @select="toggleSelect"
          />
        </div>
      </div>
      <div v-else class="row g-3 m-0">
        <div class="col-12">
          <div class="glass-card glass-engraved d-flex justify-content-center">Užduotys atliktos!</div>
        </div>
      </div>
    </div>

    <!-- buttons -->
    <transition name="slide-up">
      <div
        v-if="selectedTaskId"
        class="footer-buttons glass-card"
      >
        <div class="d-flex w-100 justify-content-center glass-engraved">{{selectedTaskName}}</div>
        <div class="d-flex justify-content-center gap-3">
          <button class="btn btn-success glass-engraved" @click="selectedTaskId = null;">Uždaryti</button>
          <button class="btn glass-engraved" @click="completeTask">Įvykdyta</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/plugins/axios'
import TaskCard from '@/components/TaskCard.vue'

const tasks = ref([])
const loading = ref(true)
const error = ref(null)

const selectedTaskId = ref(null)
const selectedTaskName = ref(null)

const toggleSelect = (taskId) => {
  if (selectedTaskId.value === taskId) {
    // jei paspaudžiam ant to paties – atžymim
    selectedTaskId.value = null
    selectedTaskName.value = null
  } else {
    // nustatom naują pažymėtą taską
    const task = tasks.value.find((t) => t.id === taskId)
    if (task) {
      selectedTaskId.value = task.id
      selectedTaskName.value = task.name
    }
  }
}

// handleris paspaudimui bet kur kitur
const handleClickOutside = (event) => {
  if (!event.target.closest('.task-block')) {
    selectedTaskId.value = null
    selectedTaskName.value = null
  }
}

// onMounted(() => {
//   document.addEventListener('click', handleClickOutside)
// })

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

onMounted(async () => {
  try {
    const res = await axios.get('/api/tasks')
    tasks.value = res.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Nepavyko gauti užduočių'
  } finally {
    loading.value = false
  }
})

const completeTask = async () => {
  if (!selectedTaskId.value) return

  try {
    const res = await axios.get(`/api/tasks/${selectedTaskId.value}/complete`)
    console.log('Task completed:', res.data)

    // pašalinam task'ą iš vietinio sąrašo
    tasks.value = tasks.value.filter(task => task.id !== selectedTaskId.value)

    // po įvykdymo atžymim pasirinktą
    selectedTaskId.value = null
  } catch (err) {
    console.error('Nepavyko pažymėti užduoties kaip atliktos:', err.response?.data || err)
  }
}
</script>

<style scoped>
.row-header {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  font-family: 'Kode Mono', monospace;
  flex-shrink: 0;
  height: 35px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.footer-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
}
</style>
