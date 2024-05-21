<template>
  <div
    class="border rounded-lg shadow hover:bg-gray-100 cursor-pointer group relative overflow-hidden"
  >
    <img class="rounded-lg w-full" :src="show.image?.medium" :alt="show.name" />
    <div
      class="absolute bottom-0 left-0 w-full p-3 bg-black bg-opacity-50 text-white text-center rounded-b-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
    >
      <h3 class="text-xl font-bold">{{ show.name }}</h3>
      <p class="text-sm">{{ show.genres.join(', ') }}</p>
      <Rating :value="show.rating.average" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Show } from '@/types'
import Rating from './Rating.vue'

defineProps<{
  show: Show
}>()
</script>

<style scoped></style>
