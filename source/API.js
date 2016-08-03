import axios from 'axios'
// lodash
import uniq from 'lodash/uniq'
import chunk from 'lodash/chunk'
import pullAll from 'lodash/pullAll'
import groupBy from 'lodash/groupBy'

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
                let filtered = fetchCharacters(data)

                callback(filtered)
            })
            return
        }

        return promise
    }

    function filterCharacters(data) {
        return data
    }

    return {
        fetchCharacters,
        setApiKey
    }
}

const API = GW2API()

module.exports = API
