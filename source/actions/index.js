import API from '../API'
import _ from 'lodash'

function setApi(payload) {
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
        })
    }
}

function changeFilter(payload) {
    return {
        type: 'CHANGE_FILTER',
        payload
    }
}

module.exports = {
    setApi,
    addStorage,
    addItem,
    changeFilter
}
