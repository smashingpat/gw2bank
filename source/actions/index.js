import API from '../API'
import _ from 'lodash'
import store from '../stores'


function setApiKey(payload) {
    return function(dispatch) {
        dispatch(changeLoadingState(true))
        API.setApiKey(payload, (data) => {
            dispatch(removeNotification())
            dispatch({
                type: 'ADD_API_KEY',
                payload: data.id
            })
            dispatch(addStorage())
            dispatch(changeLoadingState(true))
        }, (err) => {
            dispatch(addNotification({
                message: 'API Key incorrect',
                type: 'error'
            }))
            dispatch(changeLoadingState(false))
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

function reloadItems() {
    return function(dispatch) {
        dispatch(changeLoadingState(true))
        dispatch(addStorage())
        dispatch(removeSelectedItem())
        dispatch(updateFilteredItems())
        dispatch(changeLoadingState(true))
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

function updateFilteredItems(filter = store.getState().filters) {
    return function(dispatch) {
        dispatch(changeLoadingState(true))
        let payload = store.getState().items.map(item => {
            let testRarity = true
            if (filter.rarity) {
                testRarity = filter.rarity === item.rarity
            }
            let testText = new RegExp(filter.text, 'gi').test(`${item.name}`)

            return {
                ...item,
                filter: testRarity && testText
            }
        })
        dispatch({
            type: 'UPDATE_FILTERED_ITEMS',
            payload
        })
        dispatch(changeLoadingState(false))
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

function changeLoadingState(payload) {
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
    changeLoadingState,
    reloadItems
}
