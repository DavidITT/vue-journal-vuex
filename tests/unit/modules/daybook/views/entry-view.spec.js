import {createStore} from "vuex";
import {shallowMount} from "@vue/test-utils";
import {journalState} from "../../../mock-data/test-journal-state";
import journal from "@/modules/daybook/store/journal";
import EntryView from "@/modules/daybook/views/EntryView";
import Swal from "sweetalert2";

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })


jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe('Pruebas en el EntryView', () => {

    const store = createVuexStore(journalState)
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-NJpxkeupDjybZnhoWmQ'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('debe de sacar al usuario si id no existe', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'no existe'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})
    })


    test('debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot()
        expect(mockRouter.push).not.toHaveBeenCalledWith({name: 'no-entry'})
    })

    test('debe de borrar la entrada y salir', async() => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))
        await wrapper.find('.btn-danger').trigger('click')
        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Eliminar registro?',
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Si estoy seguro',
            text: 'Esta accion no se puede revertir'
        })
        expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-NJpxkeupDjybZnhoWmQ')
        expect(mockRouter.push).toHaveBeenCalled()
    })


})