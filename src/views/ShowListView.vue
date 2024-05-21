<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">TV Shows</h1>
    <ShowListHorizontal
      v-for="genre in genres"
      :key="genre"
      :genre="genre"
      :allShows="shows"
      class="mb-8"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useShowStore } from '@/stores/show'
import ShowListHorizontal from '@/components/ShowListHorizontal.vue'

const store = useShowStore()

onMounted(() => {
  store.fetchShows()
})

const shows = computed(() => store.shows)
const genres = computed(() => store.genres)
</script>

<style scoped>
/* Add your view styles here */
</style>
