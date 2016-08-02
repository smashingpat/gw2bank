import axios from 'axios'
// lodash
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'
import pullAll from 'lodash/pullAll'
import groupBy from 'lodash/groupBy'

import { dispatch } from './stores'
import { addBank, addCharacters, addItem } from './actions'



function GW2API() {

    let URL = 'https://api.guildwars2.com/v2'
    let API_KEY
    let itemIdCache = []
    let falseId = 8008135

    function setApiKey(key) {
        API_KEY = key
        getAll()
    }

    function mergeItems(items) {
        let newItems = [];

        let groupedItems = groupBy(items, 'id')

        for (let key in groupedItems) {
            let totalCount = 0;
            let items = groupedItems[key]
            let singleItem = items[0]

            items.map(item => {
                totalCount = totalCount + item.count
            })

            singleItem['count'] = totalCount
            newItems.push(singleItem)
        }

        return newItems
    }

    function filterNull(array) {
        let newArray =  array.map(node => {
            if (node === null) return [];
            return node
        })

        return newArray
    }

    function concatArray(...arrays) {
        return [].concat(...arrays)
    }

    function filterBank(bank) {
        let name = 'Bank'
        let items = mergeItems(bank
            .filter(item => item.id)
            .map(item => {
                let id = item.id
                let count = item.count

                return {
                    id,
                    count
                }
            }))
        let itemIds = uniq(items.map(item => item.id))

        return {
            name,
            itemIds,
            items
        }
    }

    function filterCharacters(charactersArray) {
        let list = charactersArray.map(character => {
            let name = character.name
            let filterItems = filterNull(character.bags).map(bag => {
                if (!bag.inventory) return [];
                return filterNull(bag.inventory)
                    .filter(item => item.id)
                    .map(item => {
                        let id = item.id
                        let count = item.count
                        return {
                            id,
                            count
                        }
                    })
            })
            let items = mergeItems(concatArray(...filterItems))

            return {
                name,
                items
            }
        })
        let storeIds = []

        list.map(character => {
            return character.items.map(item => {
                storeIds.push(item.id)
            })
        })

        let itemIds = uniq(storeIds)

        return {
            list,
            itemIds
        }
    }

    function getAll() {
        if (!API_KEY) {
            console.error('No API key found');
            return
        }
        axios.all([
            getBank(),
            getCharacters()
        ]).then((results) => {
            let bank = filterNull(results[0].data)
            let characters = filterNull(results[1].data)

            let filteredBank = filterBank(bank)
            let filteredCharacters = filterCharacters(characters)

            let combinedItemIds = concatArray(filteredBank.itemIds, filteredCharacters.itemIds)
            let uniqItemIds = uniq(combinedItemIds)

            dispatch(addBank(filteredBank))
            dispatch(addCharacters(filteredCharacters))

            fetchItems(uniqItemIds)
        })
    }

    function getBank(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/account/bank`, {params})

        if (callback) {
            promise.then(result => {
                console.log(result);
            })
        }

        return promise
    }

    function getCharacters(callback) {
        let params = { access_token: API_KEY }
        let promise = axios(`${URL}/characters?page=0`, {params})

        if (callback) {
            promise.then(result => {
                console.log(result);
            })
        }

        return promise
    }

    function fetchItems(ids, callback) {
        let idArray = concatArray(ids)
        let filtered = pullAll(idArray, itemIdCache)

        itemIdCache = itemIdCache.concat(filtered)

        let idChunks = chunk(filtered, 150)
        let requests = []

        idChunks.map(idChunk => {
            requests.push(getItems(idChunk, callback))
        })

        return axios.all(requests).then(results => {
            let filteredItems = results.map(result => {
                return result.data
            })
            let items = concatArray(...filteredItems)

            dispatch(addItem(items))
        })
    }

    function getItems(id, callback) {
        let ids = id.join()
        let params = {ids}
        let promise = axios(`${URL}/items`, {params})

        if (callback) {
            promise.then(result => {
                console.log(result);
            })
        }

        return promise
    }

    return {
        setApiKey,
        getBank,
        getCharacters,
        getAll
    }
}

const API = GW2API()

module.exports = API
