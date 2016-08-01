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

    console.log(filtered);

    return filtered
}

const App = React.createClass({
    componentDidMount() {
        API.setApiKey(this.props.api)
        API.getAll()
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
    render() {
        let props = this.props
        let filtered = filterItems(props.items, props.filter)
        return (
            <div>
                <FilterForm onSubmit={this.filterItem}/>
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
        )
    }
})

module.exports = App
