import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Item from './Item'

@connect(store => {
    return {
        filtered: store.filtered
    }
})
class ItemList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false
        }
    }
    collapsePanel() {
        this.setState({
            collapsed: this.state.collapsed ? false : true
        })
    }
    searchItem(id) {
        return this.props.filtered.filter(item => item.id === id)[0]
    }
    render() {
        let classes = classNames('ItemList', this.props.className, {
            'is-collapsed': this.state.collapsed
        })
        return (
            <div className={classes}>
                <div className='ItemList-heading' onClick={this.collapsePanel.bind(this)}>
                    <strong>{this.props.name}</strong>
                    <span className={`ItemList-professionIcon Icon-${this.props.profession}`}></span>
                </div>
                <div className='Item-container'>
                    {this.props.items.map((node, index) => {
                        let item = this.searchItem(node.id)
                        if (item) {
                            return <Item key={`${this.props.id}-${index}`} {...node} {...item} />
                        }
                    })}
                </div>
            </div>
        )
    }
}

@connect(store => {
    return {
        storage: store.storage
    }
})
class ItemListContainer extends React.Component {
    render() {
        return (
            <div className={`${this.props.className}`}>
                {this.props.storage.map((storage, index) => {
                    return <ItemList key={`${storage.name}-${index}`} {...storage}/>
                })}
            </div>
        )
    }
}


export default ItemListContainer
