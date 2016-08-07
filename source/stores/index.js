import _ from 'lodash'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import storage from './storage'
import items from './items'
import api from './api'
import filters from './filters'
import filtered from './filtered'
import notification from './notification'
import isLoading from './isLoading'
import selectedItem from './selectedItem'

const reducers = combineReducers({
    storage,
    items,
    selectedItem,
    api,
    filters,
    filtered,
    notification,
    isLoading
})

const middleware = applyMiddleware(thunk, logger({collapsed: true}))
const store = createStore(reducers, window.devToolsExtension && window.devToolsExtension(), middleware)


module.exports = store
