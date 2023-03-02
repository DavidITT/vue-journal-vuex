import {createStore} from "vuex";
import {getEntriesByTerm} from "@/modules/daybook/store/journal/getters";
import {journalState} from "../../../mock-data/test-journal-state";
import {shallowMount} from "@vue/test-utils";
import EntryList from "@/modules/daybook/components/EntryList";
import journal from "@/modules/daybook/store/journal";

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

describe('Pruebas en el EntryList', () => {

    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }
    //
    // const store = createStore({
    //     modules: {
    //         journal: {...journalMockModule}
    //     }
    // })

    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('debe de llamar el getEntriesByTerm y mostrar dos entradas', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(wrapper.findAll('entry-stub').length).toBe(2)
    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')
        await input.setValue('Hola desde')
        expect(wrapper.findAll('entry-stub').length).toBe(1)
    })

    test('el boton de nuevo debe de redireccionar a /new', async () => {
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({name: 'entry', params: {id:'new'}})
    })
})