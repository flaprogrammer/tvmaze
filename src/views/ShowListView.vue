<template>
  <div>
    <div v-if="isLoading" class="flex w-full justify-center pt-[100px]">
      <Spinner />
    </div>
    <ErrorMessage v-if="error">{{ error }}</ErrorMessage>
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
import ErrorMessage from '@/components/ErrorMessage.vue'

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
  } catch (err: any) {
    error.value = err?.message || 'An error occurred'
  } finally {
    isLoading.value = false
  }
})

const fetchNextPage = async () => {
  isLoadingNextPage.value = true
  try {
    await store.fetchNextPage()
    error.value = null
  } catch (err: any) {
    error.value = err?.message || 'An error occurred'
  } finally {
    isLoadingNextPage.value = false
  }
}

const shows = computed(() => Object.values(store.shows))
const genres = computed(() => store.genres)
</script>

<style scoped></style>
