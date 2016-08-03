import _ from 'lodash'
import { createStore, combineReducers } from 'redux'

import bank from './bank'
import characters from './characters'
import items from './items'
import api from './api'
import filters from './filters'

const reducers = combineReducers({
    bank,
    characters,
    items,
    api,
    filters
})


module.exports = createStore(reducers, window.devToolsExtension && window.devToolsExtension())
