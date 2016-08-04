import API from '../API'
import _ from 'lodash'

function setApi(payload) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_API_KEY',
            payload: API.setApiKey(payload)
        })
        dispatch(addCharacters())
    }
}

function addBank(payload) {
    return {
        type: 'ADD_BANK',
        payload
    }
}

function addCharacters() {
    return function(dispatch) {
        API.fetchCharacters(payload => {
            dispatch({
                type: 'ADD_CHARACTERS',
                payload
            })
            let itemIds = [];
            payload.map(character => {
                character.items.map(item => itemIds.push(item.id))
            })
            dispatch(addItem(_.uniq(itemIds)))
            dispatch(addItem(23046))
        })
    }
}

function addItem(ids) {
    console.log();
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
    addBank,
    addCharacters,
    addItem,
    changeFilter
}
