<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">{{ props.genre }}</h1>
    <div class="flex overflow-x-auto width-full gap-4">
      <div
        v-for="show in filteredShows"
        :key="show.id"
        class="flex-shrink-0 w-1/4 md:w-1/5 lg:w-1/6"
      >
        <ShowCard :show="show" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Show } from '../types'
import ShowCard from './ShowCard.vue'

const props = defineProps<{
  genre: string
  allShows: Show[]
}>()

const filteredShows = computed(() =>
  props.allShows
    .filter((show) => show.genres.includes(props.genre))
    .sort((a, b) => b.rating.average - a.rating.average)
)
</script>

<style scoped>
/* Add your component styles here */
</style>
