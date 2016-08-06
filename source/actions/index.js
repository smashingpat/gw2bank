import API from '../API'
import _ from 'lodash'
import store from '../stores'


function setApiKey(payload) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_API_KEY',
            payload: API.setApiKey(payload)
        })
        dispatch(addStorage())
    }
}

function addStorage() {
    return function(dispatch) {
        API.fetchAll(payload => {
            dispatch({
                type: 'ADD_STORAGE',
                payload
            })
            let itemIds = []
            payload.map(node => node.items.map(item => itemIds.push(item.id)))
            dispatch(addItem(itemIds))
        })
    }
}

function addItem(ids) {
    return function(dispatch) {
        API.fetchItems(ids, payload => {
            dispatch({
                type: 'ADD_ITEM',
                payload
            })
            dispatch(updateFilteredItems());
        })
    }
}

function changeFilter(payload) {
    return function(dispatch) {
        dispatch({
            type: 'CHANGE_FILTER',
            payload
        })
        dispatch(updateFilteredItems(payload))
    }
}

function updateFilteredItems(filter = store.getState().filters) {
    return function(dispatch) {
        let payload = store.getState().items.map(item => {
            let compare = `${item.name} - ${item.type } - ${item.rarity}`
            let test = new RegExp(filter, 'gi').test(compare)
            return Object.assign({}, item, {
                filter: test ? true : false
            })
        })
        dispatch({
            type: 'UPDATE_FILTERED_ITEMS',
            payload
        })
    }
}

module.exports = {
    setApiKey,
    addStorage,
    addItem,
    changeFilter
}
