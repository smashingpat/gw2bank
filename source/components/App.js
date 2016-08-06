import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

import API from '../API'
import { setApiKey, changeFilter } from '../actions'

// components
import Input from './Input'
import ItemList from './ItemList'

@connect((store) => {
    return {
        api: store.api,
        filter: store.filters,
        filtered: store.filtered,
        storages: store.storage,
        items: store.items,
    }
})

class App extends React.Component {
    componentDidMount() {
        // this.setApiKey(API.getApiKey())
        this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
    }

    setApiKey(key) {
        this.props.dispatch(setApiKey(key))
    }

    setFilter(value) {
        this.props.dispatch(changeFilter(value))
    }

    filterItem(id) {
        return this.props.filtered.filter(item => item.id === id)[0]
    }

    render() {
        let props = this.props
        return (
            <div className='Wrapper'>
                {props.api ? '' : ( <Input label='api key' value={props.api} onSubmit={this.setApiKey.bind(this)} /> )}
                <Input label='filter' value={props.filter} onSubmit={this.setFilter.bind(this)} />
                {props.storages.map((storage, index) => (
                    <ItemList key={`${storage.name}-${index}`} {...storage} itemSearch={this.filterItem.bind(this)} />
                ))}
            </div>
        )
    }
}

export default App
