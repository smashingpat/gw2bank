import React from 'react'
import classNames from 'classnames'

const Notification = ({
    message,
    type
}) => {
    let classes = classNames({
        'Notification': true,
        'is-active': type ? true : false,
        'is-error': type === 'error',
        'is-warning': type === 'warning'
    })
    return  (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Notification
