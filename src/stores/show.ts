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
      try {
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
      } catch (error) {
        console.error('Error fetching shows:', error)
      }
    },
    async fetchNextPage() {
      this.currentPage++
      try {
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
      } catch (error) {
        console.error('Error fetching next page:', error)
      }
    },
    async fetchShowById(id: string) {
      try {
        const data = await api.fetchShowById(id)
        this.shows[id] = data
      } catch (error) {
        console.error('Error fetching show by id:', error)
      }
    },
    async searchSingleShow(query: string) {
      try {
        const data = await api.fetchSingleShowByQuery(query)
        if (!data) {
          throw new Error('No show found')
        }
        this.shows = {
          ...this.shows,
          [data.id]: data
        }
        return data.id
      } catch (error) {
        console.error('Error fetching single show:', error)
      }
    }
  }
})
