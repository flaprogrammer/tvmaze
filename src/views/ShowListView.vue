<template>
  <div>
    <div v-if="isLoading" class="flex w-full justify-center pt-[100px]">
      <Spinner />
    </div>
    <div v-if="error">{{ error }}</div>
    <ShowListHorizontal
      v-show="!isLoading && !error"
      v-for="genre in genres"
      :key="genre"
      :genre="genre"
      :allShows="shows"
      @onLoadMore="fetchNextPage"
      :isLoadingMore="isLoadingNextPage"
      class="mb-8"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useShowStore } from '@/stores/show'
import ShowListHorizontal from '@/components/ShowListHorizontal.vue'
import Spinner from '@/components/Spinner.vue'

const store = useShowStore()
const isLoading = ref(false)
const isLoadingNextPage = ref(false)
const error = ref(null)

onMounted(async () => {
  // Don't fetch shows if already fetched
  if (store.currentPage) return

  isLoading.value = true
  try {
    await store.fetchShows()
    error.value = null
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
})

const fetchNextPage = async () => {
  isLoadingNextPage.value = true
  try {
    await store.fetchNextPage()
    error.value = null
  } catch (err) {
    error.value = err.message
  } finally {
    isLoadingNextPage.value = false
  }
}

const shows = computed(() => Object.values(store.shows))
const genres = computed(() => store.genres)
</script>

<style scoped>
/* Add your view styles here */
</style>
