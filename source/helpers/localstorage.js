class LocalStorage {
    constructor() {
        this.storage = window.localStorage;
    }

    set(name, data) {
        let stringified = JSON.stringify(data)
        return this.storage.setItem(name, stringified)
    }

    get(name) {
        let retrieved = this.storage[name]
        return retrieved ? JSON.parse(retrieved) : retrieved
    }

}

export default new LocalStorage()
