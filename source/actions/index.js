import API from '../API'
import _ from 'lodash'

function setApi(payload) {
    return function(dispatch) {
        dispatch({
            type: 'ADD_API_KEY',
            payload: API.setApiKey(payload)
        })
        dispatch(addData())
    }
}

function addData() {
    return function(dispatch) {
        // dispatch(addBank())
        // dispatch(addCharacters())
        API.fetchAll(payload => {
            dispatch({
                type: 'ADD_STORAGE',
                payload
            })
        })
    }
}

function addBank() {
    return function(dispatch) {
        API.fetchBank(payload => {
            dispatch({
                type: 'ADD_BANK',
                payload
            })
            let itemIds = [];
            payload.map(bank => {
                bank.items.map(item => item.id)
            })
            dispatch(addItem(_.uniq(itemIds)))
        })
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
                character.items.map(item => item.id)
            })
            dispatch(addItem(_.uniq(itemIds)))
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
