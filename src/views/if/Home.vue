<template>
  <div class="d-flex flex-column vh-100 mx-2 gap-2">
    <!-- header -->
    <header class="row-header text-center text-white"></header>

    <!-- big box -->
    <div class="glass-card flex-shrink-0 overflow-y-scroll" style="height: 200px">
        <ul class="list-group list-group-flush glass-engraved" style="background: none;">
          <li
            v-for="taskTemplate in taskTemplates"
            :key="taskTemplate.id"
            class="list-group-item d-flex justify-content-between align-items-center"
            style="background: none;"
          >
            <span class="font-size-rem-0-8">{{ taskTemplate.name }}</span>
            <div>
              <i class="bi bi-trophy font-size-rem-0-8"></i>
              <span class="badge bg-transparent rounded-pill font-size-rem-0-7" style="background: none;">{{ taskTemplate.streak }} / {{ taskTemplate.streak_max }} / {{ taskTemplate.freeze }}</span>
            </div>
          </li>
        </ul>
    </div>

    <!-- blocks container -->
    <div class="blocks-container flex-grow-1 overflow-auto" style="overflow-x: hidden">
      <!-- Loading -->
      <div v-if="loading" class="row g-2 m-0">
        <div class="col-12">
          <div class="glass-card glass-engraved d-flex justify-content-center align-items-center p-3">
            <div class="spinner-border text-light me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            Kraunama...
          </div>
        </div>
      </div>

      <!-- Tasks -->
      <div v-else-if="tasks.length > 0" class="row g-2 m-0">
        <div class="glass-engraved font-size-rem-0-7">Šiandien</div>
        <div class="d-flex flex-wrap gap-2 m-0 p-0">
          <div class="task-col" v-for="task in todayTasks" :key="task.id">
            <TaskCard
              :task="task"
              :selected="selectedTaskId === task.id"
              @select="toggleSelect"
            />
          </div>
        </div>

        <div class="glass-engraved font-size-rem-0-7">Rytoj</div>
        <div class="d-flex flex-wrap gap-2 m-0 p-0">
          <div class="task-col" v-for="task in tomorrowTasks" :key="task.id">
            <TaskCard
              :task="task"
              :selected="selectedTaskId === task.id"
              :disabled="true"
              @select="toggleSelect"
            />
          </div>
        </div>

      </div>
      <div v-else class="row g-2 m-0">
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
import { ref, onMounted, onActivated, onBeforeUnmount, onUnmounted, computed } from 'vue'
import axios from '@/plugins/axios.js'
import TaskCard from '@/components/TaskCard.vue'
import gsap from "gsap"

const tasks = ref([])
const taskTemplates = ref([])
const loading = ref(true)
const error = ref(null)

const selectedTaskId = ref(null)
const selectedTaskName = ref(null)

const todayTasks = computed(() => tasks.value.filter(t => t.today))
const tomorrowTasks = computed(() => tasks.value.filter(t => t.tomorrow))

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

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

const fetchTasks = async () => {
  try {
    const res = await axios.get('/api/tasks')
    tasks.value = res.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Nepavyko gauti užduočių'
  } finally {
    loading.value = false
  }
}

const fetchTaskTemplates = async () => {
  try {
    const res = await axios.get('/api/task-templates')
    taskTemplates.value = res.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Nepavyko gauti užduočių šablonų'
  } finally {
    loading.value = false
  }
}

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    fetchTaskTemplates();
    fetchTasks();
  }
}

onMounted(() => {
  document.addEventListener("visibilitychange", handleVisibilityChange)
  fetchTaskTemplates()
  fetchTasks()
})

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange)
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

    // ir atnaujinam informaciją
    fetchTaskTemplates();

  } catch (err) {
    console.error('Nepavyko pažymėti užduoties kaip atliktos:', err.response?.data || err)
  }
}
</script>

<style scoped>

</style>
