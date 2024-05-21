<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">TV Shows</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useShowStore } from '@/stores/show'
import ShowCard from '../components/ShowCard.vue'

const store = useShowStore()

onMounted(() => {
  store.fetchShows()
})

const shows = computed(() => store.shows)
</script>

<style scoped>
/* Add your view styles here */
</style>
