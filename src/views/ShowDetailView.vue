<template>
  <div v-if="show" class="container mx-auto p-4 max-w-[800px]">
    <h1 class="text-4xl font-bold mb-4">{{ show.name }}</h1>
    <div class="flex flex-col md:flex-row">
      <div class="flex-shrink-0 md:mr-4">
        <img :src="show.image?.original" alt="Show Image" class="mb-4 max-h-80" />
        <Rating :value="show.rating.average" />
        <p class="font-bold">Genres: {{ show.genres.join(', ') }}</p>
        <p class="font-bold">Premiered: {{ show.premiered }}</p>
      </div>
      <div class="flex-grow md:pl-4">
        <p class="text-gray-700 mb-4" v-html="show.summary"></p>
      </div>
    </div>
  </div>
  <div v-else class="container mx-auto p-4">
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { useShowStore } from '@/stores/show'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Rating from '@/components/Rating.vue'

const store = useShowStore()
const route = useRoute()

const showId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const show = computed(() => store.shows[showId])

onMounted(() => {
  store.fetchShowById(showId)
})
</script>

<style scoped></style>
