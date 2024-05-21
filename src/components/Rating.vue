<template>
  <div class="star-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      v-bind:class="{ full: star <= computedRating }"
    >
      &#9733;
      <!-- Star character -->
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

// Define the props
const props = defineProps<{
  /* Rating from 0 to 10 */
  value: number
}>()

const computedRating = computed(() => Math.round(props.value / 2))
</script>

<style scoped>
.star-rating .star {
  color: rgb(211, 209, 209); /* Default color */
  font-size: 24px;
}
.star-rating .full {
  color: rgb(248, 238, 107); /* Color for active stars based on rating */
}
</style>
