const React = require('react')



const Item = ({
    id,
    name,
    icon,
    count
}) => (
    <div className={`Item`}>
        <img className={`Item-image`} src={icon} alt={name} />
        <div>{name} ({count})</div>
    </div>
)

module.exports = Item
