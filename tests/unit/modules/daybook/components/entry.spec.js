import {shallowMount} from "@vue/test-utils";
import Entry from '@/modules/daybook/components/Entry'
import {journalState} from "../../../mock-data/test-journal-state";
import entry from "@/modules/daybook/components/Entry";


describe('Pruebas en entry component', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[1]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('debe hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('debe de redireccionar al hacer click en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith(
            {
                name: 'entry',
                params: {
                    id: journalState.entries[1].id
                }
            })
    })

    test('pruebas en las propiedades computadas ', () => {
        expect(wrapper.vm.day).toBe(21)
        expect(wrapper.vm.month).toBe('Diciembre')
        expect(wrapper.vm.yearDay).toBe('2022, Miércoles')
    })
});

