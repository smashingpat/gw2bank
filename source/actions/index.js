// import API from '../API'

let URL = 'https://api.guildwars2.com/v2/'

function setApi(text) {
    return {
        type: 'ADD_API_KEY',
        text
    }
}

function addBank(items) {
    return {
        type: 'ADD_BANK',
        items
    }
}

function addCharacters(characters) {
    return {
        type: 'ADD_CHARACTERS',
        characters
    }
}

function addItem(items) {
    return {
        type: 'ADD_ITEM',
        items
    }
}

function changeFilter(filter) {
    return {
        type: 'CHANGE_FILTER',
        filter
    }
}

module.exports = {
    setApi,
    addBank,
    addCharacters,
    addItem,
    changeFilter
}
