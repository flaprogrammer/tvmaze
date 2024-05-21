<template>
  <div class="header flex flex-row-reverse">
    <SearchField @onSearch="onSearch" class="w-full md:max-w-[500px]" />
  </div>
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
