import React from 'react'
import classNames from 'classnames'

import Item from './Item'

const ItemList = React.createClass({
    getInitialState() {
        return {
            collapsed: false
        }
    },
    collapsePanel() {
        this.setState({
            collapsed: this.state.collapsed ? false : true
        })
    },
    render() {
        let classes = classNames({
            'ItemList': true,
            'is-collapsed': this.state.collapsed
        })
        return (
            <div className={classes}>
                <div className='ItemList-heading' onClick={this.collapsePanel}>
                    <strong>{this.props.name}</strong>
                    <span className={`ItemList-professionIcon Icon-${this.props.profession}`}></span>
                </div>
                <div className='Item-container'>
                    {this.props.items.map((node, index) => {
                        let item = this.props.itemSearch(node.id)
                        if (item) {
                            return <Item key={`${this.props.id}-${index}`} {...node} {...item} />
                        }
                    })}
                </div>
            </div>
        )
    }
})

export default ItemList
