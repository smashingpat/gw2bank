import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

import API from '../API'
import storage from '../helpers/localstorage'
import { setApiKey, changeFilter, resetFilter, addSelectedItem } from '../actions'

// components
import SearchBar from './SearchBar'
import Input from './Input'
import ItemList from './ItemList'
import Notification from './Notification'
import InfoPanel from './infoPanel'

@connect((store) => ({
    api: store.api,
    filter: store.filters,
    filtered: store.filtered,
    storages: store.storage,
    items: store.items,
    selectedItem: store.selectedItem,
    notification: store.notification,
    isLoading: store.isLoading
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

    filterItem(id) {
        return this.props.filtered.filter(item => item.id === id)[0]
    }

    render() {
        return (
            <div>
                <Notification {...this.props.notification} />
                {!this.props.api ?  (
                    <div className='Wrapper Wrapper--small Wrapper--center'>
                        <Input label='api key' value={this.props.api} onSubmit={this.setApiKey.bind(this)} />
                        <p>Get your key at <a href="https://account.arena.net/applications" target='_blank'>{'account.arena.net/applications'}</a></p>
                    </div>
                ) : (
                    <div className='Wrapper Wrapper--full Bank'>

                        <SearchBar className='Bank-search'/>

                        {this.props.storages.map((storage, index) => (
                            <ItemList key={`${storage.name}-${index}`} {...storage} itemSearch={this.filterItem.bind(this)} />
                        ))}

                    </div>
                )}
            </div>
        )
    }
}

export default App
