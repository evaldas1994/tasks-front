<template>
  <div class="row m-2">
    <div
      v-for="(folder, key) in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]"
      :key="key"
      class="col-4 g-0">
      <folder-card/>
    </div>
  </div>
</template>

<script setup>

import FolderCard from '@/components/ulala/category/FolderCard.vue'
</script>

<style scoped>

</style>
