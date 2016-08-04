import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

import API from '../API'
import { setApi, changeFilter } from '../actions'

@connect((store) => {
    return {
        api: store.api,
        filter: store.filters,
        characters: store.characters,
        items: store.items
    }
})

class App extends React.Component {
    componentDidMount() {
        this.setApiKey()
        // bind this to functions
        this.setFilter = this.setFilter.bind(this)
    }

    setFilter(event) {
        event.preventDefault()
        let value = this.refs.input.value
        this.props.dispatch(changeFilter(value))
        this.refs.input.value = ''
    }

    setApiKey() {
        this.props.dispatch(setApi('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'))
    }

    render() {
        let props = this.props
        return (
            <div>
                <form onSubmit={this.setFilter}>
                    <input ref='input'/>
                </form>
                <JSONTree data={props} />
            </div>
        )
    }
}

export default App
