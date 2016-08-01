const React = require('react')



const Item = ({
    id,
    name,
    icon,
    count
}) => (
    <div className={`Item`}>
        <div className={`Item-count`}>{count}</div>
        <img className={`Item-image`} src={icon} alt={name} />
    </div>
)

module.exports = Item
