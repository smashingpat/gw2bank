import React from 'react'
import classNames from 'classnames'
import { dispatch } from '../stores'

import { addSelectedItem } from '../actions'

const ItemTooltip = (props) => {

    return (
        <div className='Item-tooltip'>
            {props.name}
        </div>
    )
}

class Item extends React.Component {
    selectItem() {
        dispatch(addSelectedItem(this.props))
    }
    render() {
        let classes = classNames({
            'Item': true,
            'is-hidden': !this.props.filter
        })
        return (
            <div className={classes} onClick={this.selectItem.bind(this)} tabIndex='1'>
                {this.props.count > 1 ? (
                    <div className='Item-count'>{this.props.count}</div>
                ): ('')}
                <img className={`Item-icon is-${this.props.rarity}`} src={this.props.icon} />
            </div>
        )
    }
}

export default Item
