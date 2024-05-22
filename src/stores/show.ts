import type { Show } from '@/types'
import { defineStore } from 'pinia'
import * as api from '@/api'

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: {} as Record<string, Show>,
    genres: [] as string[],
    currentPage: 0
  }),
  actions: {
    async fetchShows() {
      const data = await api.fetchShows()
      this.shows = {
        ...data.reduce(
          (acc, show) => {
            acc[show.id] = show
            return acc
          },
          {} as Record<string, Show>
        )
      }
      // get all genres from this.shows
      this.genres = Array.from(
        new Set(
          data
            .map((show: Show) => show.genres)
            .flat()
            .filter((genre: string) => genre)
        )
      )
      this.currentPage++
    },
    async fetchNextPage() {
      const data = await api.fetchNextPage(this.currentPage)
      this.shows = {
        ...this.shows,
        ...data.reduce(
          (acc, show) => {
            acc[show.id] = show
            return acc
          },
          {} as Record<string, Show>
        )
      }
      this.currentPage++
    },
    async fetchShowById(id: string) {
      const data = await api.fetchShowById(id)
      if (data.status === 404) {
        throw new Error('Show not found')
      }
      this.shows[id] = data
    },
    async searchSingleShow(query: string) {
      const data = await api.fetchSingleShowByQuery(query)
      if (!data) {
        throw new Error('No show found')
      }
      this.shows = {
        ...this.shows,
        [data.id]: data
      }
      return data.id
    }
  }
})
