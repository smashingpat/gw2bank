import _ from 'lodash'
import { createStore, combineReducers } from 'redux'

const bank = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_BANK':
            return action.items
        default:
            return state
    }
}

const characters = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CHARACTERS':
            return action.characters
        default:
            return state
    }
}

const items = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            let data = state.concat(action.items)
            return data
        default:
            return state
    }
}

const api = (state = '', action) => {
    switch (action.type) {
        case 'ADD_API_KEY':
            return action.text
        default:
            return state
    }
}

const filter = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.filter
        default:
            return state
    }
}

const reducers = combineReducers({
    bank,
    characters,
    items,
    api,
    filter
})


module.exports = createStore(reducers, window.devToolsExtension && window.devToolsExtension())
