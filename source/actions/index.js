import API from '../API'
import _ from 'lodash'
import store from '../stores'


function setApiKey(payload) {
    return function(dispatch) {
        API.setApiKey(payload, (data) => {
            dispatch(removeNotification())
            dispatch({
                type: 'ADD_API_KEY',
                payload: data.id
            })
            dispatch(addStorage())
        }, (err) => {
            dispatch(addNotification({
                message: 'API Key incorrect',
                type: 'error'
            }))
        })
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

function resetFilter() {
    return function(dispatch) {
        dispatch({
            type: 'RESET_FILTER'
        })
        dispatch(updateFilteredItems(''))
    }
}

function updateFilteredItems(filter = store.getState().filters) {
    return function(dispatch) {
        let payload = store.getState().items.map(item => {
            let compare = `${item.name} - ${item.type } - ${item.rarity}`
            let test = new RegExp(filter, 'gi').test(compare)
            return {
                ...item,
                filter: test ? true : false
            }
        })
        dispatch({
            type: 'UPDATE_FILTERED_ITEMS',
            payload
        })
    }
}

function addNotification(payload) {
    return {
        type: 'ADD_NOTIFICATION',
        payload
    }
}

function removeNotification() {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

module.exports = {
    setApiKey,
    addStorage,
    addItem,
    changeFilter,
    resetFilter,
    addNotification,
    removeNotification
}
