<template>
  <div class="row m-2">
    <div
      v-for="(folder, key) in [1,2,3,4,5,6,7,8,9,10]"
      :key="key"
      class="col-4 g-0">
      <folder-card
        :keyy="key"
      />
    </div>
  </div>
</template>

<script setup>

import FolderCard from '@/components/ulala/category/FolderCard.vue'
</script>

<style scoped>

</style>
