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
        this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
        this.setFilter('exotic')
        // bind this to functions
        this.setApiKey = this.setApiKey.bind(this)
        this.setFilter = this.setFilter.bind(this)
        this.filterItem = this.filterItem.bind(this)
    }

    setApiKey(key) {
        // let testKey = '068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'
        // this.props.dispatch(setApi(testKey))
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
            <div>
                <Input value={props.api} onSubmit={this.setApiKey} />
                <Input value={props.filter} onSubmit={this.setFilter} />
                {props.storages.map(storage => (
                    <ItemList key={storage.name} {...storage} itemSearch={this.filterItem} />
                ))}
                <div className='JSONTree'>
                    <JSONTree data={props} />
                </div>
            </div>
        )
    }
}

export default App
