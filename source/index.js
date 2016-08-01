// Dependencies
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'

import Store from './stores'
import Action from './actions'

// Components
import App from './components/App'


const render = () => {
    let props = Store.getState()
    ReactDOM.render(
        <App {...props} />,
        document.getElementById('root')
    )
}

render()

Store.subscribe(() => {
    render()
});
