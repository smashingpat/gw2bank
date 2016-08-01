const React = require('react')



const ItemContainer = (props) => {
    return (
        <div className={`Item-container`}>
            <div>{props.name}</div>
            {props.children}
        </div>
    )
}

module.exports = ItemContainer
