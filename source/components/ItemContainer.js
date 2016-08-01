const React = require('react')



const ItemContainer = (props) => {
    return (
        <div className={`Item-container`}>
            <h3 style={{'margin-bottom': '0px'}}>{props.name}</h3>
            {props.children}
        </div>
    )
}

module.exports = ItemContainer
