import API from '../API'
import _ from 'lodash'


function setApiKey(payload) {
    return function(dispatch) {
        dispatch(setLoadingState(true))
        API.setApiKey(payload, (data) => {
            dispatch(removeNotification())
            dispatch({
                type: 'ADD_API_KEY',
                payload: data.id
            })
            dispatch(addStorage())
            dispatch(setLoadingState(false))
        }, (err) => {
            dispatch(addNotification({
                message: 'API Key incorrect',
                type: 'error'
            }))
            dispatch(setLoadingState(false))
        })
    }
}

function removeApiKey() {
    return function(dispatch) {
        API.clearApiKey()
        dispatch({type: 'REMOVE_API_KEY'})
    }
}

function addStorage() {
    return function(dispatch) {
        dispatch(setLoadingState(true))
        API.fetchAll(payload => {
            dispatch({
                type: 'ADD_STORAGE',
                payload
            })
            let itemIds = []
            payload.map(node => node.items.map(item => itemIds.push(item.id)))
            dispatch(addItem(itemIds))
            dispatch(setLoadingState(false))
        }, err => {
            dispatch(addNotification({
                message: "Couldn't retrieve data",
                type: 'error'
            }))
            dispatch(setLoadingState(false))
        })
    }
}

function addItem(ids) {
    return function(dispatch) {
        dispatch(setLoadingState(true))
        API.fetchItems(ids, payload => {
            dispatch({
                type: 'ADD_ITEM',
                payload
            })
            dispatch(updateFilteredItems())
            dispatch(setLoadingState(false))
        })
    }
}

function reloadItems() {
    return function(dispatch) {
        dispatch(removeSelectedItem())
        dispatch(addStorage())
    }
}

function addSelectedItem(payload) {
    return {
        type: 'ADD_SELECTED_ITEM',
        payload
    }
}

function removeSelectedItem() {
    return {
        type: 'REMOVE_SELECTED_ITEM'
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

function updateFilteredItems() {
    return function(dispatch, getState) {
        let { filters, items } = getState()

        let payload = items.map(item => {
            let testRarity = true
            if (filters.rarity) {
                testRarity = filters.rarity === item.rarity
            }
            let testText = new RegExp(filters.text, 'gi').test(`${item.name}`)

            return {
                ...item,
                filter: testRarity && testText
            }
        })
        dispatch({
            type: 'UPDATE_FILTERED_ITEMS',
            payload
        })
    }
}

function addNotification(payload) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload
        })
        setTimeout(() => dispatch(removeNotification()), 6000)
    }
}

function removeNotification() {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

function setLoadingState(payload) {
    return {
        type: 'CHANGE_LOADING_STATE',
        payload
    }
}

module.exports = {
    setApiKey,
    removeApiKey,
    addStorage,
    addItem,
    addSelectedItem,
    removeSelectedItem,
    changeFilter,
    resetFilter,
    addNotification,
    removeNotification,
    setLoadingState,
    reloadItems
}
