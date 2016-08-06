import axios from 'axios'
import _ from 'lodash'
import storage from './helpers/localstorage'


function GW2API() {

    let URL = 'https://api.guildwars2.com/v2'
    let API_KEY
    let itemIdCache = []

    function init() {
        getStorage()
    }

    init()

    function fetchApiInfo(key, callback, error) {

    }

    function getStorage() {
        API_KEY = storage.get('api_key') || ''
    }

    function getApiKey() {
        return storage.get('api_key')
    }

    function setApiKey(key, callback, errorCallback) {
        let params = { access_token: key }
        return axios(`${URL}/tokeninfo`, {params}).then(result => {
            let data = result.data

            API_KEY = key
            storage.set('api_key', key)

            callback(data)

        }).catch(err => errorCallback(err))
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
                {
                    name: 'Bank',
                    items: [
                        ...filteredBank
                    ]
                },
                ...filteredCharacters
            ]

            callback(data)
        }))
    }

    function fetchBank(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/account/bank`, {params})

        return promise
    }

    function filterBank(bank) {
        let filtered = filterEmpty(bank)
        let items = mergeArray(filtered)

        return items
    }

    function fetchCharacters(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/characters?page=0`, {params})

        return promise
    }

    function filterCharacters(characters) {
        let filtered = characters.map(node => {
            let name = node.name
            let filteredBags = filterEmpty(node.bags).map(bag => filterEmpty(bag.inventory))
            let filteredEquipment = node.equipment.map(slot => ({...slot, count: 1}))
            let filteredItems = [
                ...filteredEquipment,
                ...filteredBags
            ]
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

        promise.then(result => {
            let data = [].concat(...result.map(node => node.data))
            callback(data)
        }).catch(err => console.error(err))
    }

    function getItems() {
        return storedItems
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

        return single;
    }

    function filterEmpty(array) {
        return _.compact(array)
    }

    return {
        fetchAll,
        fetchBank,
        fetchCharacters,
        fetchItems,
        getItems,
        setApiKey,
        getApiKey
    }
}

const API = GW2API()

export default API
