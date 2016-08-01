import React from 'react'

import API from '../API'
import Store from '../stores'
import Action from '../actions'

import ItemContainer from './ItemContainer'
import Item from './Item'
import FilterForm from './FilterForm'

const filterItems = (items, filter) => {
    let regexp = new RegExp(filter, 'gi')
    if (!filter) return items;

    let filtered = items.filter(item => regexp.test(item.name));

    return filtered
}

const App = React.createClass({
    componentDidMount() {
        API.setApiKey(this.props.api)

    },
    getInitialState() {
        return {
            filtered: []
        }
    },
    componentWillReceiveProps() {
        this.replaceState({
            filtered: this.props.items
        })
    },
    filterItem(filter) {
        Store.dispatch(Action.changeFilter(filter))
    },
    filterItems() {

    },
    getItem(items, id) {
        let result = items.filter(item => item.id === id)[0];
        return result
    },
    setApiKey(key) {
        let testKey
        // testKey = '068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'
        testKey = key
        Store.dispatch(Action.setApi(testKey))
        API.setApiKey(testKey)
    },
    render() {
        let props = this.props
        let filtered = filterItems(props.items, props.filter)
        return (
            <div className='Wrapper'>
                {props.api ? (
                    <div>
                        <FilterForm label='Search' onSubmit={this.filterItem}/>
                        <div className='button' onClick={() => {
                            API.getAll();
                        }}>Refresh data</div>
                        {props.characters.list ? props.characters.list.map(character => {
                            return (
                                <ItemContainer key={character.name} {...character} >
                                    {character.items.map((node, i) => {
                                        let item = this.getItem(filtered, node.id)
                                        return (
                                            item ? <Item key={`${node.id}-${i}`} {...node} {...item} /> : ''
                                        )
                                    })}
                                </ItemContainer>
                            )
                        }) : 'no characters found' }
                    </div>
                ) : (
                    <FilterForm label='API key' onSubmit={this.setApiKey}>
                        Paste here your API key, you can create one here: <a href='https://account.arena.net/applications'>LINK</a>
                    </FilterForm>
                )}
            </div>
        )
    }
})

module.exports = App
