import React from 'react'
import classNames from 'classnames'

const Item = (props) => {
    let classes = classNames({
        'Item': true,
        'is-hidden': !props.filter
    })
    return (
        <div className={classes}>
            <div className='Item-count'>{props.count}</div>
            <img className={`Item-icon is-${props.rarity.toLowerCase()}`} src={props.icon} />
        </div>
    )
}

const ItemList = (props) => (
    <div className='ItemList'>
        <div className='ItemList-heading'>{props.name}</div>
        <div className='Item-container'>
            {props.items.map((node, index) => {
                let item = props.itemSearch(node.id)
                if (item) {
                    return <Item key={`${props.id}-${index}`} {...node} {...item} />
                }
            })}
        </div>
    </div>
)

export default ItemList
