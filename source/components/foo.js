import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {removeSelectedItem} from '../actions'

import CloseButton from 'react-icons/lib/go/x'


const InfoPanelItem = ({
    label,
    children
}) => {
    let styles = {
        display: !children ? 'none' : ''
    }
    return (
        <div className='Info-item' style={styles}>
            <span className='Info-label'>{label}</span>
            <span dangerouslySetInnerHTML={{
                __html: children
            }} />
        </div>
    )
}

@connect(store => {
    return {
        item: store.selectedItem
    }
})
class InfoPanel extends React.Component {
    closePanel() {
        this.props.dispatch(removeSelectedItem())
    }
    render() {
        let classes = classNames('Info', this.props.className, {
            'is-active': this.props.item.name ? true : false
        })
        return (
            <div className={classes} ref='element'>

                <img className={`Item-icon is-${this.props.item.rarity} Info-icon`} src={this.props.item.icon} />

                <div className='Info-name'>
                    <strong>{this.props.item.name}</strong>
                    {this.props.item.count > 1 ? (<small> ({this.props.item.count})</small>) : ''}
                </div>

                <InfoPanelItem label='Description'>{this.props.item.description}</InfoPanelItem>
                <InfoPanelItem label='Type'>{this.props.item.type}</InfoPanelItem>
                <InfoPanelItem label='Item code'>{this.props.item.chat_link}</InfoPanelItem>

                <CloseButton className='Info-closeButton' onClick={this.closePanel.bind(this)} />
            </div>
        )
    }
}

export default InfoPanel
