<template>
  <div
    @click="toggleSelect"
    :class="[
      'block h-100 d-flex flex-column justify-content-start align-items-between',
      {
        'selected-task': selected,
        'disabled-task': disabled
      }]"
  >
    <!-- viršus: laikas + ikona -->
    <div>

        <div class="glass-engraved w-100 mb-3 d-flex align-items-center justify-content-between">


          <span class="font-size-rem-1-5">{{ task.time }}</span>


          <div class="glass-engraved font-size-rem-0-5">
            <div>
              <i class="bi bi-trophy"></i>
              <span class="ps-1">{{ task.streak }}</span>
            </div>
            <div>
              <i class="bi bi-clock"></i>
              <span class="ps-1">{{ task.duration_in_minutes }}</span>
            </div>
          </div>


            <i class="bi bi-lightning-charge"></i>
        </div>

    </div>

    <!-- apačia: tekstas -->
    <div class="glass-engraved w-100 text-card-title font-size-rem-1-0" style="min-width: 0">
      {{ task.name }}
    </div>

    <div class="glass-engraved w-100 font-size-rem-0-4" style="min-width: 0">
      {{ task.description }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: { type: Object, required: true },
  selected: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['select'])

function toggleSelect() {
  if (props.disabled)
    return;

  emit('select', props.task.id)
}
</script>

<style scoped>

.selected-task {
  outline: 2px solid #b98bda;
  outline-offset: -2px;
}

.disabled-task {
  outline: 2px solid #7e7e7e;
  outline-offset: -2px;
  background: none;
  opacity: 0.6;
}
</style>
