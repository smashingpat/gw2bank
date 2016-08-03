import API from '../API'

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
        })
    }
}

function addItem(payload) {
    return {
        type: 'ADD_ITEM',
        payload
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
