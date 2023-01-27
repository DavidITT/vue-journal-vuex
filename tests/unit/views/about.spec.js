import { shallowMount } from '@vue/test-utils'
import About from '@/views/AboutView'

describe('Pruebas About view', () => {
    test('debe de renderizar el componente correctamente', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot()
    })
})