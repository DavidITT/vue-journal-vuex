import {createStore} from 'vuex'
import journal from '@/modules/daybook/store/journal'
import {journalState} from "../../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
    })

describe('Vuex - Pruebas en el journal Module', () => {

    test('Estado incicial, Debe de tener este state', () => {
        const store = createVuexStore(journalState)
        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)
    })

    //                       Mutations

    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading: true, entries: []})
        store.commit('journal/setEntries', journalState.entries)
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('mutation: updatEntry', () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "-NJpwzkgfZOw4mXONgJt",
            date: 1671647650767,
            picture: "https://res.cloudinary.com/dhrbaevpa/image/upload/v1671649371/najfe6uwk34oyl5xizst.jpg",
            text: "Hola desde test unit mocks"
        }

        const entries = store.state.journal.entries

        store.commit('journal/updateEntry', updatedEntry)

        expect(entries.length).toBe(2)
        expect(entries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry)
    })

    test('mutation: addEntry and deleteEntry', () => {
        const store = createVuexStore(journalState)

        const entry = {
            id: "ABC-123",
            date: 1671647650767,
            picture: "https://res.cloudinary.com/dhrbaevpa/image/upload/v1671649371/najfe6uwk34oyl5xizst.jpg",
            text: "Hola mundo cruel"
        }

        store.commit('journal/addEntry', entry)

        const entries = store.state.journal.entries

        expect(entries.length).toBe(3)
        expect(entries.find(e => e.id === entry.id)).toBeTruthy()

        store.commit('journal/deleteEntry', entry.id)
        expect(entries.length).toBe(2)
        expect(entries.find(e => e.id === entry.id)).toBeFalsy()
    })

    //                       Getters

    test('getter: getEntriesByTerm ', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('test').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('test')).toEqual([entry1])

    })

    test('getter: getEntriesById ', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesById'](entry1.id)).toEqual(entry1)

    })

    //                          Actions

    test('actions: loadEntries', async () => {
        const store = createVuexStore({isLoading: true, entries: []})

        await store.dispatch('journal/loadEntries')

        //expect(store.state.journal.entries.length).toBe(4)
    })

    test('actions: updateEntry', async () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "-NJpwzkgfZOw4mXONgJt",
            date: 1671647650767,
            text: "Este es un test"
        }

        await store.dispatch('journal/updateEntry', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)
        ).toEqual({
            id: "-NJpwzkgfZOw4mXONgJt",
            date: 1671647650767,
            text: "Este es un test"
        })
    })

    test('actions: createEntry and deleteEntry', async () => {
        const store = createVuexStore(journalState)

        const newEntry = {
            date: 1671647650767,
            text: "Este es un test de crear y borrar entrada"
        }

        const id = await store.dispatch('journal/createEntry', newEntry)

        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        //Parte 2

        await store.dispatch('journal/deleteEntry',id)

        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
    })


})