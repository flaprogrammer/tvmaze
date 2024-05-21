import type { Show } from '@/types'
import { defineStore } from 'pinia'

export const useShowStore = defineStore('show', {
  state: () => ({
    shows: {} as Record<string, Show>,
    genres: [] as string[],
    currentPage: 0
  }),
  actions: {
    async fetchShows() {
      try {
        this.currentPage = 0
        const response = await fetch('http://api.tvmaze.com/shows')
        const data: Show[] = await response.json()
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
        const response = await fetch(`http://api.tvmaze.com/shows?page=${this.currentPage}`)
        const data: Show[] = await response.json()
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
        const response = await fetch(`http://api.tvmaze.com/shows/${id}`)
        const data: Show = await response.json()
        this.shows[id] = data
      } catch (error) {
        console.error('Error fetching show by id:', error)
      }
    },
    async searchSingleShow(query: string) {
      try {
        const response = await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${query}`)
        const data: Show = await response.json()
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
