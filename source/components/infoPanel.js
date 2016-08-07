import React from 'react'
import classNames from 'classnames'

class InfoPanel extends React.Component {
    componentDidMount() {
        // requestAnimationFrame(this.followMouse.bind(this))
    }
    // followMouse(event) {
    //     console.log(event);
    //     requestAnimationFrame(this.followMouse.bind(this))
    // }
    render() {
        let classes = classNames({
            'Bank-info': true,
            'is-active': this.props.name ? true : false
        })
        return (
            <div className={classes} ref='element'>
                <img className={`Item-icon is-${this.props.rarity}`} src={this.props.icon} />
                <p><strong>Name</strong>: {this.props.name}</p>
            </div>
        )
    }
}

export default InfoPanel
