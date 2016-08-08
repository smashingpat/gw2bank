import React from 'react'
import { connect } from 'react-redux'
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

@connect(store => {
    return {
        item: store.selectedItem
    }
})
class InfoPanel extends React.Component {
    componentDidMount() {
        // requestAnimationFrame(this.followMouse.bind(this))
    }
    closePanel() {
        this.props.dispatch(removeSelectedItem())
    }
    render() {
        let classes = classNames({
            'Info': true,
            'is-active': this.props.item.name ? true : false
        })
        return (
            <div className={`${this.props.className} + ${classes}`} ref='element'>
                <div className='Info-closeButton' onClick={this.closePanel.bind(this)}>x</div>
                <img className={`Item-icon is-${this.props.item.rarity} Info-icon`} src={this.props.item.icon} />
                <div className='Info-name'>{this.props.item.name}</div>
                <InfoPanelItem label='Description'>{this.props.item.description}</InfoPanelItem>
                <InfoPanelItem label='Type'>{this.props.item.type}</InfoPanelItem>
                <InfoPanelItem label='Chat link'>
                    <code>{this.props.item.chat_link}</code>
                </InfoPanelItem>
            </div>
        )
    }
}

export default InfoPanel
