import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchField from '../SearchField.vue'

describe('SearchField', () => {
  it('renders the input and button', () => {
    const wrapper = mount(SearchField, {
      props: {
        errorMessage: null
      }
    })

    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits onSearch event on button click', async () => {
    const wrapper = mount(SearchField)
    const input = wrapper.find('input[type="text"]')
    input.setValue('Game of Thrones')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('onSearch')).toBeTruthy()
    expect(wrapper.emitted('onSearch')?.[0]).toEqual(['Game of Thrones'])
  })

  it('emits onSearch event on enter key', async () => {
    const wrapper = mount(SearchField)
    const input = wrapper.find('input[type="text"]')
    input.setValue('Game of Thrones')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('onSearch')).toBeTruthy()
    expect(wrapper.emitted('onSearch')?.[0]).toEqual(['Game of Thrones'])
  })

  it('displays an error message when there is an error', () => {
    const errorMessage = 'Error fetching results'
    const wrapper = mount(SearchField, {
      props: {
        errorMessage
      }
    })

    const errorDisplay = wrapper.find('.text-red-700')
    expect(errorDisplay.exists()).toBe(true)
    expect(errorDisplay.text()).toBe(errorMessage)
  })
})
