import _ from 'lodash'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

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

const middleware = applyMiddleware(logger())
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension(), middleware)


module.exports = store
