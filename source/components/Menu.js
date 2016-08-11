import React from 'react'
import { connect } from 'react-redux'
import { removeApiKey } from '../actions'


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
    }
    render() {
        return (
            <div className={`Menu ${this.state.collapsed ? '' : 'is-active'}`}>
                <div className='Menu-itemContainer'>
                    <div className='Menu-item' onClick={this.removeApiKey.bind(this)}>{'Remove API Key'}</div>
                </div>

                <div className='Menu-icon' onClick={this.toggleCollapsed.bind(this)}/>
            </div>
        )
    }
}


export default Menu
