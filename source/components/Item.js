const React = require('react')



const Item = ({
    id,
    name,
    icon,
    count
}) => (
    <div className='Item' style={{backgroundImage: `url(${icon})`}}>
        <div className='Item-count'>{count}</div>
    </div>
)

module.exports = Item
