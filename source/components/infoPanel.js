import React from 'react'
import classNames from 'classnames'
import {removeSelectedItem} from '../actions'

import CodeBlock from './CodeBlock'



const InfoPanelItem = ({
    label,
    children
}) => {
    if (!children) return null;
    return (
        <div className='Info-item'>
            <span className='Info-label'>{label}</span>
            {children}
        </div>
    )
}

class InfoPanel extends React.Component {
    componentDidMount() {
        // requestAnimationFrame(this.followMouse.bind(this))
    }
    closePanel() {
        this.props.dispatch(removeSelectedItem())
    }
    render() {
        if (!this.props) return null;
        let classes = classNames({
            'Bank-info': true,
            'Info': true,
            'is-active': this.props.name ? true : false
        })
        return (
            <div className={classes} ref='element'>
                <div className='Info-closeButton' onClick={this.closePanel.bind(this)}>x</div>
                <img className={`Item-icon is-${this.props.rarity} Info-icon`} src={this.props.icon} />
                <div className='Info-name'>{this.props.name}</div>
                <InfoPanelItem label='Description'>{this.props.description}</InfoPanelItem>
                <InfoPanelItem label='Type'>{this.props.type}</InfoPanelItem>
                <InfoPanelItem label='Chat link'>
                    <code>{this.props.chat_link}</code>
                </InfoPanelItem>
            </div>
        )
    }
}

export default InfoPanel
