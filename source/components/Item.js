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

export default Item
