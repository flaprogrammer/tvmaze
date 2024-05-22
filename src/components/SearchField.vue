<template>
  <div>
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="emitSearch"
        placeholder="Input TV show name"
        class="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none"
      />
      <button
        @click="emitSearch"
        class="absolute right-0 top-0 mt-[1px] bg-pink-500 text-white py-3 px-4 rounded-lg shadow hover:bg-pink-600"
      >
        Search
      </button>
    </div>
    <div v-if="errorMessage" class="absolute text-red-700 py-3">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

defineProps<{
  errorMessage: string | null | undefined
}>()

const emit = defineEmits(['onSearch'])
const searchQuery = ref('')

const emitSearch = () => {
  emit('onSearch', searchQuery.value)
}
</script>

<style scoped></style>
