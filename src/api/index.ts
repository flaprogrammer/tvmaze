const HOST_URL = 'http://api.tvmaze.com/'
import type { Show } from '../types'

export const fetchShows = async (): Promise<Show[]> => {
  const response = await fetch(HOST_URL + 'shows')
  return await response.json()
}

export const fetchShowById = async (id: string): Promise<Show> => {
  const response = await fetch(HOST_URL + `shows/${id}`)
  return await response.json()
}

export const fetchNextPage = async (page: number): Promise<Show[]> => {
  const response = await fetch(HOST_URL + `shows?page=${page}`)
  return await response.json()
}

export const fetchSingleShowByQuery = async (query: string): Promise<Show> => {
  const response = await fetch(HOST_URL + `singlesearch/shows?q=${query}`)
  return await response.json()
}
