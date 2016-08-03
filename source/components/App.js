import React from 'react'

import API from '../API'
import Store from '../stores'
import Action from '../actions'

import ItemContainer from './ItemContainer'
import Item from './Item'
import FilterForm from './FilterForm'

const App = React.createClass({
    componentDidMount() {
        this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
    },
    setApiKey(key) {
        Store.dispatch(Action.setApi(key))
        API.setApiKey(key)
    },
    render() {
        let props = this.props
        return (
            <div>
                <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
            </div>
        )
    }
})

module.exports = App
