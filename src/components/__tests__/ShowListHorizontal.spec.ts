import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowListHorizontal from '../ShowListHorizontal.vue'
import ShowCard from '../ShowCard.vue'
import Spinner from '../Spinner.vue'
import { RouterLinkStub } from '@vue/test-utils'
import type { Show } from '@/types'

describe('ShowListComponent', () => {
  it('renders genre title and show cards correctly', () => {
    const shows = [
      { id: 1, genres: ['Drama'], rating: { average: 8.2 } },
      { id: 2, genres: ['Drama'], rating: { average: 9.1 } }
    ] as Show[]

    const wrapper = mount(ShowListHorizontal, {
      props: {
        genre: 'Drama',
        allShows: shows,
        isLoadingMore: false
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    expect(wrapper.text()).toContain('Drama')
    expect(wrapper.findAllComponents(ShowCard).length).toBe(2)
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(2)
  })

  it('sorts show cards by rating', () => {
    const shows = [
      { id: 1, genres: ['Drama'], rating: { average: 8.2 } },
      { id: 2, genres: ['Drama'], rating: { average: 9.1 } }
    ] as Show[]

    const wrapper = mount(ShowListHorizontal, {
      props: {
        genre: 'Drama',
        allShows: shows,
        isLoadingMore: false
      }
    })

    const sortedIds = wrapper.findAllComponents(ShowCard).map((node) => node.props('show').id)
    expect(sortedIds).toEqual([2, 1]) // Expect show with higher rating first
  })

  it('emits onLoadMore event when Load More is clicked', async () => {
    const wrapper = mount(ShowListHorizontal, {
      props: {
        genre: 'Drama',
        allShows: [],
        isLoadingMore: false
      }
    })

    await wrapper.find('.bg-gray-100').trigger('click')
    expect(wrapper.emitted('onLoadMore')).toBeTruthy()
  })

  it('displays spinner when isLoadingMore is true', () => {
    const wrapper = mount(ShowListHorizontal, {
      props: {
        genre: 'Drama',
        allShows: [],
        isLoadingMore: true
      }
    })

    expect(wrapper.findComponent(Spinner).exists()).toBe(true)
  })
})
