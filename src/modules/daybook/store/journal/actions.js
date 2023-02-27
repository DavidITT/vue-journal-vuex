import journalApi from "@/api/journalApi";

export const loadEntries = async ({commit}) => {
    const {data} = await journalApi.get('/entries.json') //Firebase
    if(!data) {
        commit('setEntries', [])
        return
    }
    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }
    //Sort by date
    entries.sort((obj1, obj2) => (obj1.date > obj2.date) ? 1 : (obj1.date < obj2.date) ? -1 : 0);
    commit('setEntries', entries)
}

export const updateEntry = async ({commit}, entry) => {
    const {date, picture, text} = entry
    const dataToSave = {date, picture, text}
    const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
    dataToSave.id = entry.id
    commit('updateEntry', {...dataToSave})
}

export const createEntry = async ({commit}, entry) => {
    const {date, picture, text} = entry
    const dataToSave = {date, picture, text}
    const {data} = await journalApi.post('/entries.json', dataToSave)
    dataToSave.id = data.name
    commit('addEntry', {...dataToSave})
    return data.name
}

export const deleteEntry = async ({commit}, id) => {
    const {data} = await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)
}
