import React from 'react'

import API from '../API'
import Store from '../stores'
import Action from '../actions'

import ItemContainer from './ItemContainer'
import Item from './Item'
import FilterForm from './FilterForm'

const Temp = () => (
    <div>

    </div>
)

const App = React.createClass({
    componentDidMount() {
        API.setApiKey(this.props.api)
        this.setApiKey('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072')
    },
    changeFilter(filter) {
        Store.dispatch(Action.changeFilter(filter))
    },
    filterItems(items, filter) {
        let regexp = new RegExp(filter, 'gi')
        if (!filter) return items;
        return items.filter(item => regexp.test(item.name))
    },
    getItem(items, id) {
        let result = items.filter(item => item.id === id)[0];
        return result
    },
    setApiKey(key) {
        Store.dispatch(Action.setApi(key))
        API.setApiKey(key)
    },
    render() {
        let props = this.props
        let filtered = this.filterItems(props.items, props.filter)
        let combinedItems = [].concat(props.characters.list, props.bank)

        return (
            <div className='Wrapper'>
                {props.api ? (
                    <div>
                        <FilterForm label='Search' onSubmit={this.changeFilter}/>
                        {combinedItems.length > 2 ? combinedItems.map(node => (
                            <ItemContainer key={node.name} {...node} >
                                {node.items.map((node, i) => {
                                    let item = this.getItem(filtered, node.id)
                                    return (
                                        item ? <Item key={`${node.id}-${i}`} {...node} {...item} /> : ''
                                    )
                                })}
                            </ItemContainer>
                        )) : null }
                    </div>
                ) : (
                    <FilterForm label='API key' onSubmit={this.setApiKey} />
                )}
            </div>
        )
    }
})

module.exports = App
