import { describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import Header from '../Header.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Mocking store and router
vi.mock('@/stores/show', () => ({
  useShowStore: () => ({
    searchSingleShow: vi.fn()
  })
}))

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

describe('HeaderComponent', () => {
  it('navigates to the root on logo click', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    })

    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.props('to')).toBe('/')
  })
})
