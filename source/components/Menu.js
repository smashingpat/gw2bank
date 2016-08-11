import React from 'react'
import { connect } from 'react-redux'
import { removeApiKey } from '../actions'
import CogWheel from 'react-icons/lib/md/settings'


@connect(store => {
    return {}
})
class Menu extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: true
        }
    }
    toggleCollapsed() {
        this.setState({
            collapsed: this.state.collapsed ? false : true
        })
    }
    removeApiKey() {
        this.props.dispatch(removeApiKey())
        this.toggleCollapsed()
    }
    render() {
        return (
            <div className={`Menu ${this.state.collapsed ? '' : 'is-active'}`}>
                <div className='Menu-itemContainer'>
                    <div className='Menu-item' onClick={this.removeApiKey.bind(this)}>{'Remove API Key'}</div>
                </div>

                <CogWheel className='Menu-icon' onClick={this.toggleCollapsed.bind(this)} />
            </div>
        )
    }
}


export default Menu
