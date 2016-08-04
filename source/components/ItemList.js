import React from 'react'

export default (props) => (
    <div>
        <p>{props.name}</p>
        <div>
            {props.items.map(node => {
                let item = props.itemSearch(node.id)
                if (item) {
                    return (
                        <div key={node.id}>
                            <img src={item.icon} alt={item.name} width='20' />
                            {item.name} ({node.count})
                        </div>
                    )
                }
            })}
        </div>
    </div>
)
