<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchQuery"
      @keyup.enter="emitSearch"
      placeholder="Input TV show name"
      class="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="emitSearch"
      class="absolute right-0 top-0 mt-[1px] bg-[#fd3a6a] text-white py-3 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['onSearch'])
const searchQuery = ref('')

const emitSearch = () => {
  emit('onSearch', searchQuery.value)
}
</script>

<style scoped></style>
