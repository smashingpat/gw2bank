import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

@connect(store => {
    return {
        notification: store.notification
    }
})
class Notifications extends React.Component {
    render() {
        let classes = classNames('Notification', this.props.className, {
            'is-active': this.props.notification.type ? true : false,
            'is-error': this.props.notification.type === 'error',
            'is-warning': this.props.notification.type === 'warning'
        })
        return  (
            <div className={classes}>
                {this.props.notification.message}
            </div>
        )
    }
}

export default Notifications
