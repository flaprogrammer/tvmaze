<template>
  <header class="flex justify-between items-center mb-5 flex-wrap">
    <router-link :to="`/`">
      <div class="flex items-center text-[#fd3a6a]">
        <img src="/tv.png" alt="" class="h-[70px]" />
        <span class="text-xl font-bold">TV MAZE</span>
      </div>
    </router-link>
    <SearchField @onSearch="onSearch" class="w-full md:max-w-[500px]" />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useShowStore } from '@/stores/show'
import SearchField from './SearchField.vue'

const store = useShowStore()
const router = useRouter()

const onSearch = async (value: string) => {
  const id = await store.searchSingleShow(value)
  if (id) {
    router.push(`/show/${id}`)
  }
}
</script>

<style scoped></style>
