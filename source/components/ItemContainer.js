const React = require('react')



const ItemContainer = (props) => {
    return (
        <div className={`Item-container`}>
            <h3 className={`Item-heading`}>{props.name}</h3>
            {props.children}
        </div>
    )
}

module.exports = ItemContainer
