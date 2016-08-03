const React = require('react')



const Item = ({
    id,
    name,
    icon,
    count
}) => (
    <div className='Item'>
        <div className='Item-icon' style={{backgroundImage: `url(${icon})`}}></div>
    </div>
)

module.exports = Item
