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
        // get all genres from this.shows
        this.genres = Array.from(
          new Set(
            this.shows
              .map((show) => show.genres)
              .flat()
              .filter((genre) => genre)
          )
        )
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
