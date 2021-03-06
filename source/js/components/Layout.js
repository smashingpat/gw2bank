import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import API from '../API'
import storage from '../helpers/localstorage'
import { setApiKey, changeFilter, resetFilter, addSelectedItem, addStorage } from '../actions'

// components
import SearchBar from './SearchBar'
import Input from './Input'
import ItemList from './ItemList'
import Notification from './Notification'
import InfoPanel from './InfoPanel'
import LoadingScreen from './LoadingScreen'
import Menu from './Menu'

@connect((store) => {
    return store
})
class App extends React.Component {
    componentDidMount() {
        let storedKey = API.getApiKey()
        if (storedKey) {
            this.setApiKey(storedKey)
        }
    }
    setApiKey(key) {
        this.props.dispatch(setApiKey(key))
    }

    render() {
        let classes = classNames('App', this.props.className, {
            'is-loading': this.props.isLoading
        })
        return (
            <div className={classes}>
                <LoadingScreen />
                <Notification />
                <Menu />
                {!this.props.api ?  (
                    <div className='Wrapper Wrapper--small Wrapper--center'>
                        <p>
                            Lost an item on one of your many characters? I help you find it!
                        </p>
                        <Input label='api key' value={this.props.api} onSubmit={this.setApiKey.bind(this)} />
                        <p>
                            Get your api key at <a href="https://account.arena.net/applications" target='_blank'>{'account.arena.net/applications'}</a>
                        </p>
                    </div>
                ) : (
                    <div className='Bank'>
                        <SearchBar className='Bank-search' />
                        <ItemList  className='Bank-items' />
                        <InfoPanel className='Bank-info' />
                    </div>
                )}
            </div>
        )
    }
}

export default App
