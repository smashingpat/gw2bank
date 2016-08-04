import axios from 'axios'
import _ from 'lodash'


function GW2API() {

    let URL = 'https://api.guildwars2.com/v2'
    let API_KEY
    let itemCache = []
    let itemIdCache = []

    function setApiKey(key) {
        API_KEY = key
        return API_KEY
    }

    function fetchAll(callback) {
        let promises = [
            fetchBank(),
            fetchCharacters(),
        ]

        return axios.all(promises).then(axios.spread((bank, characters) => {
            let filteredBank = filterBank(bank.data)
            let filteredCharacters = filterCharacters(characters.data)
            let data = [
                ...filteredBank,
                ...filteredCharacters
            ]
            callback(data)
        }))
    }

    function fetchBank(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/account/bank`, {params})

        return promise
        // .then(result => {
        //     let data = result.data
        //     let filtered = filterBank(data)
        //
        //     return callback(filtered)
        // })
    }

    function filterBank(bank) {
        return [
            {
                name: 'Bank',
                items: bank
            }
        ]
    }

    function fetchCharacters(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/characters?page=0`, {params})

        return promise
        // .then(result => {
        //     let data = result.data
        //     let filtered = filterCharacters(data)
        //
        //     callback(filtered)
        // })
    }

    function filterCharacters(characters) {
        let filtered = characters.map(node => {
            let name = node.name
            let filteredItems = filterEmpty(node.bags).map(bag => filterEmpty(bag.inventory))
            let items = [].concat(...filteredItems)
            let grouped = mergeArray(items)
            let itemIds = []

            return {
                name,
                items: grouped
            }
        })
        return filtered
    }

    function fetchItems(id, callback) {
        let ids = [].concat(id)
        let filteredIds = _.pullAll(ids, itemIdCache)
        itemIdCache = itemIdCache.concat(filteredIds)

        let chunks = _.chunk(filteredIds, 150)
        let promises = chunks.map(chunk => {
            let params = { ids: chunk.join(',') }
            return axios(`${URL}/items`, {params})
        })
        let promise = axios.all([
            ...promises
        ])

        if (typeof(callback) == 'function') {
            promise.then(result => {
                let data = result.map(node => node.data)
                itemCache = itemCache.concat(...data)
                callback(itemCache)
            }).catch(err => console.error(err))
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
        return _.compact(array)
    }

    return {
        fetchAll,
        fetchBank,
        fetchCharacters,
        fetchItems,
        setApiKey
    }
}

const API = GW2API()

export default API
