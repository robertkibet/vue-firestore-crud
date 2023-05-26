import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppHeader, { props: { loading: true } })
    expect(wrapper.text()).toContain('Home')
  })
})
