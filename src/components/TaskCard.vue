<template>
  <div
    class="block h-100 d-flex flex-column justify-content-start align-items-between"
    @click="$emit('select', task.id)"
    :class="{ 'border-primary shadow selected-task': selected }"
  >
    <!-- viršus: laikas + ikona -->
    <div>
      <div
        class="position-relative glass-engraved d-flex justify-content-between align-items-center w-100 mb-3"
        style="min-width: 0"
      >
        <div class="d-flex">
          <div>
            <span>{{ task.time }}</span>
          </div>
          <div class="glass-engraved text-card-content ms-2 mt-2">
            <div>
              <i class="bi bi-trophy"></i>
              <span>{{ task.streak }}</span>
            </div>
            <div>
              <i class="bi bi-clock"></i>
              <span>{{ task.duration_in_minutes }}</span>
            </div>
          </div>
        </div>
        <i class="bi bi-lightning-charge"></i>
      </div>
    </div>

    <!-- apačia: tekstas -->
    <div class="glass-engraved w-100 text-card-title" style="min-width: 0">
      {{ task.name }}
    </div>

    <div class="glass-engraved w-100 text-card-content" style="min-width: 0">
      {{ task.description }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: { type: Object, required: true },
  selected: { type: Boolean, default: false }
})

defineEmits(['select'])
</script>

<style scoped>
.text-card-title {
  font-size: 16px;
}

.text-card-content {
  font-size: 6px;
}

.selected-task {
  outline: 2px solid gray;
  outline-offset: -2px;
}
</style>
