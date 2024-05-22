import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShowStore } from './show'
import * as api from '@/api'

vi.mock('@/api', () => ({
  fetchShows: vi.fn(),
  fetchNextPage: vi.fn(),
  fetchShowById: vi.fn(),
  fetchSingleShowByQuery: vi.fn()
}))

describe('ShowStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetches shows and updates state correctly', async () => {
    const shows = [{ id: '1', genres: ['Drama'], rating: { average: 8.0 } }]
    api.fetchShows.mockResolvedValue(shows)
    const store = useShowStore()
    await store.fetchShows()

    expect(store.shows['1']).toEqual(shows[0])
    expect(store.genres).toEqual(['Drama'])
    expect(store.currentPage).toBe(1)
  })

  it('fetches next page of shows and increments currentPage', async () => {
    const additionalShows = [{ id: '2', genres: ['Comedy'], rating: { average: 7.5 } }]
    api.fetchNextPage.mockResolvedValue(additionalShows)
    const store = useShowStore()
    await store.fetchShows() // Assume this sets currentPage to 1
    await store.fetchNextPage()

    expect(store.shows['2']).toEqual(additionalShows[0])
    expect(store.currentPage).toBe(2)
  })

  it('fetches a show by ID and handles not found error', async () => {
    const errorResponse = { status: 404 }
    api.fetchShowById.mockResolvedValue(errorResponse)
    const store = useShowStore()
    try {
      await store.fetchShowById('invalid-id')
    } catch (error: any) {
      expect(error.message).toBe('Show not found')
    }
  })

  it('searches for a single show and returns its ID', async () => {
    const showData = { id: '3', name: 'Example Show', genres: ['Action'], rating: { average: 9.0 } }
    api.fetchSingleShowByQuery.mockResolvedValue(showData)
    const store = useShowStore()
    const resultId = await store.searchSingleShow('Example Show')

    expect(store.shows['3']).toEqual(showData)
    expect(resultId).toBe('3')
  })
})
