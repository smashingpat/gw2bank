import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
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
        let classes = classNames('Menu', this.props.className, {
            'is-active': !this.state.collapsed
        })
        return (
            <div className={classes}>
                <div className='Menu-itemContainer'>
                    <div className='Menu-item' onClick={this.removeApiKey.bind(this)}>{'Remove API Key'}</div>
                    <div className='Menu-text'>
                        <p>
                            {'Got a question, got feedback or wanna say hi PM me ingame at '}
                            <strong>{'Ashenheim.5039'}</strong>
                            {''}
                        </p>
                    </div>
                </div>

                <CogWheel className='Menu-icon' onClick={this.toggleCollapsed.bind(this)} />
            </div>
        )
    }
}


export default Menu
