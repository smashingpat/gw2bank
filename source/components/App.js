import React from 'react'
import {connect} from 'react-redux'
import JSONTree from 'react-json-tree'

import API from '../API'
import storage from '../helpers/localstorage'
import { setApiKey, changeFilter, resetFilter, addSelectedItem } from '../actions'

// components
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

    setFilter(event) {
        event.preventDefault()
        let text = this.refs.text.value
        let rarity = this.refs.rarity.value
        this.props.dispatch(changeFilter({
            text,
            rarity
        }))
    }

    filterItem(id) {
        return this.props.filtered.filter(item => item.id === id)[0]
    }

    render() {
        return (
            <div>
                <Notification {...this.props.notification} />
                <div className='Wrapper Wrapper--full'>
                    {!this.props.api ?  (
                        <div>
                            <Input label='api key' value={this.props.api} onSubmit={this.setApiKey.bind(this)} />
                            <p>Get your key at <a href="https://account.arena.net/applications" target='_blank'>{'account.arena.net/applications'}</a></p>
                        </div>
                    ) : (
                        <div className='Bank'>

                            <form className={`Bank-search Form`} onSubmit={this.setFilter.bind(this)}>
                                <input className='formItem-input' style={{width: '100%'}} placeholder='filter' ref='text'/>
                                <select ref='rarity' onChange={this.setFilter.bind(this)}>
                                    <option value=''>rarity</option>
                                    <option value='Junk'>Junk</option>
                                    <option value='Basic'>Basic</option>
                                    <option value='Fine'>Fine</option>
                                    <option value='Masterwork'>Masterwork</option>
                                    <option value='Rare'>Rare</option>
                                    <option value='Exotic'>Exotic</option>
                                    <option value='Ascended'>Ascended</option>
                                    <option value='Legendary'>Legendary</option>
                                </select>
                                <button type='submit'>submit</button>
                            </form>

                            {this.props.storages.map((storage, index) => (
                                <ItemList key={`${storage.name}-${index}`} {...storage} itemSearch={this.filterItem.bind(this)} />
                            ))}

                            <InfoPanel {...this.props.selectedItem} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App
