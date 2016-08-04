import axios from 'axios'
import _ from 'lodash'


function GW2API() {

    let URL = 'https://api.guildwars2.com/v2'
    let API_KEY
    let itemIdCache = []

    function setApiKey(key) {
        API_KEY = key
        return API_KEY
    }

    function fetchCharacters(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/characters?page=0`, {params})

        if (typeof(callback) == "function") {
            promise.then(result => {
                let data = result.data
                let filtered = filterCharacters(data)

                callback(filtered)
            })
            return
        }

        return promise
    }

    function filterCharacters(characters) {
        let filtered = characters.map(node => {
            let name = node.name
            let filteredItems = filterEmpty(node.bags).map(bag => filterEmpty(bag.inventory))
            let items = [].concat(...filteredItems)

            let grouped = mergeArray(items)

            return {
                name,
                items
            }
        })
        return filtered
    }

    function fetchItems(id, callback) {
        let ids = [].concat(id)
        itemIdCache = ids
        console.log('itemIdCache', itemIdCache);

        let params = { ids: ids.join(',') }
        let promise = axios(`${URL}/items`, {params})

        if (typeof(callback) == 'function') {
            promise.then(result => {
                let data = result.data
            }).catch(err => console.log(err))
            return
        }

        return promise
    }

    function mergeArray(array, label = 'count') {

        let single = _(array).groupBy('id').values().value().map(node => {
            let countStore = 0;
            let counted = node.map((node, i) => {
                let newNode = node
                countStore = countStore + newNode[label]
                newNode[label] = countStore
                return newNode
            })
            return node[node.length - 1]
        })

        return array;
    }

    function filterEmpty(array) {
        return array.filter(node => node !== null)
    }

    return {
        fetchCharacters,
        fetchItems,
        setApiKey
    }
}

const API = GW2API()

export default API
