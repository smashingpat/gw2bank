import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'
import API from '../API'
import { setApiKey, changeFilter } from '../actions'

// components
import Input from './Input'

@connect((store) => {
    return {
        api: store.api,
        filter: store.filters,
        storage: store.storage,
        items: store.items,
    }
})

class App extends React.Component {
    componentDidMount() {
        this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
        // bind this to functions
        this.setFilter = this.setFilter.bind(this)
    }

    setFilter(value) {
        this.props.dispatch(changeFilter(value))
    }

    setApiKey(key) {
        // let testKey = '068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'
        // this.props.dispatch(setApi(testKey))
        this.props.dispatch(setApiKey(key))
    }

    render() {
        let props = this.props
        return (
            <div>
                <Input value={props.filter} onSubmit={this.setFilter.bind(this)} />
                <JSONTree data={props} />
            </div>
        )
    }
}

export default App
