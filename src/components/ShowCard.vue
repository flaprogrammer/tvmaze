<template>
  <div @click="selectShow" class="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer">
    <h3 class="text-xl font-bold">{{ show.name }}</h3>
    <p class="text-sm text-gray-600">{{ show.genres.join(', ') }}</p>
    <p class="text-sm text-gray-600">Rating: {{ show.rating.average }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useShowStore } from '../stores/show'

// Define the props
const props = defineProps<{
  show: {
    name: string
    genres: string[]
    rating: {
      average: number
    }
  }
}>()

const store = useShowStore()

const selectShow = () => {
  store.setSelectedShow(props.show)
}
</script>

<style scoped>
/* Add your component styles here */
</style>
