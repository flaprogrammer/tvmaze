// import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//   const doubleCount = computed(() => count.value * 2)
//   function increment() {
//     count.value++
//   }

//   return { count, doubleCount, increment }
// })

import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: [] as any[],
    genres: [] as string[],
    selectedShow: null as any | null
  }),
  actions: {
    async fetchShows() {
      try {
        const response = await fetch('http://api.tvmaze.com/shows')
        const data = await response.json()
        this.shows = data
      } catch (error) {
        console.error('Error fetching shows:', error)
      }
    },
    setSelectedShow(show: any) {
      this.selectedShow = show
    }
  }
})

// export default pinia
