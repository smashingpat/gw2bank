// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './stores'
import JSONTree from 'react-json-tree'

// Components
import App from './components/App'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
