import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

import API from '../API'
import storage from '../helpers/localstorage'
import { setApiKey, changeFilter } from '../actions'

// components
import Input from './Input'
import ItemList from './ItemList'

@connect((store) => ({
    api: store.api,
    filter: store.filters,
    filtered: store.filtered,
    storages: store.storage,
    items: store.items,
    error: store.error
}))

class App extends React.Component {
    componentDidMount() {
        let storedKey = API.getApiKey()
        if (storedKey) {
            this.setApiKey(storedKey)
        }
        // this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
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
        return (
            <div>
                <div className={`Error ${this.props.error ? 'is-active' : ''}`}>
                    {this.props.error.message}
                </div>
                <div className='Wrapper'>
                    {!this.props.api ?  (
                        <div>
                            <Input label='api key' value={this.props.api} onSubmit={this.setApiKey.bind(this)} />
                            <p>Get your key at <a href="https://account.arena.net/applications" target='_blank'>{'account.arena.net/applications'}</a></p>
                        </div>
                    ) : (
                        <div>
                            <Input label='filter' value={this.props.filter} onSubmit={this.setFilter.bind(this)} />
                            {this.props.storages.map((storage, index) => (
                                <ItemList key={`${storage.name}-${index}`} {...storage} itemSearch={this.filterItem.bind(this)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App
