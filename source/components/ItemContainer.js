const React = require('react')



const ItemContainer = (props) => {
    return (
        <div className='ItemContainer'>
            <div className='ItemContainer-heading'>{props.name}</div>
            <div className='ItemContainer-container'>{props.children}</div>
        </div>
    )
}

module.exports = ItemContainer
