<template>
  <header class="flex justify-between items-center mb-5 flex-wrap">
    <router-link :to="`/`">
      <div class="flex items-center text-[#fd3a6a]">
        <img src="/tv.png" alt="" class="h-[70px]" />
        <span class="text-xl font-bold">TV MAZE</span>
      </div>
    </router-link>
    <SearchField @onSearch="onSearch" class="w-full md:max-w-[500px]" :errorMessage="error" />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useShowStore } from '@/stores/show'
import SearchField from './SearchField.vue'
import { ref } from 'vue'

const store = useShowStore()
const router = useRouter()

const error = ref(null)

const onSearch = async (value: string) => {
  error.value = null
  try {
    const id = await store.searchSingleShow(value)
    if (id) {
      router.push(`/show/${id}`)
    }
  } catch (e: any) {
    error.value = e?.message || 'An error occurred'
  }
}
</script>

<style scoped></style>
