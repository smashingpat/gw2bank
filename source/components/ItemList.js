import React from 'react'

const Item = (props) => {
    return (
        <div className={`Item ${props.filter ? '' : 'is-hidden'}`}>
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
