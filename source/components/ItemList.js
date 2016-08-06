import React from 'react'

const Item = (props) => (
    <div className='Item'>
        <img className={`Item-icon is-${props.rarity.toLowerCase()}`} src={props.icon} />
    </div>
)

const ItemList = (props) => (
    <div className='ItemList'>
        <p>{props.name}</p>
        <div className='Item-container'>
            {props.items.map((node, index) => {
                let item = props.itemSearch(node.id)
                if (item) {
                    return <Item key={`${props.id}-${index}`} {...props} {...item} />
                }
            })}
        </div>
    </div>
)

export default ItemList
