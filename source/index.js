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

// Store.dispatch(Action.setApi('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'))
