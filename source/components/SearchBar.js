import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import ResetIcon from 'react-icons/lib/md/close'
import ReloadIcon from 'react-icons/lib/md/find-replace'

import { changeFilter, resetFilter, reloadItems } from '../actions'

@connect(store => ({

}))

class SearchBar extends React.Component {

    setFilter(event) {
        event.preventDefault()
        let text = this.refs.text.value
        let rarity = this.refs.rarity.value
        this.props.dispatch(changeFilter({
            text,
            rarity
        }))
    }

    resetFilter(event) {
        event.preventDefault()
        this.refs.text.value = ''
        this.refs.rarity.selectedIndex = 0;
        this.props.dispatch(resetFilter())
    }

    reloadItems(event) {
        event.preventDefault()
        this.props.dispatch(reloadItems())
    }

    render() {
        let classes = classNames('Form', this.props.className)
        return (
            <form className={classes} onSubmit={this.setFilter.bind(this)}>
                <div className='FormItem'>

                    <input className='formItem-input' style={{width: '100%'}} placeholder='filter' ref='text'/>

                    <select ref='rarity' onChange={this.setFilter.bind(this)}>
                        <option value=''>rarity</option>
                        <option value='Junk'>Junk</option>
                        <option value='Basic'>Basic</option>
                        <option value='Fine'>Fine</option>
                        <option value='Masterwork'>Masterwork</option>
                        <option value='Rare'>Rare</option>
                        <option value='Exotic'>Exotic</option>
                        <option value='Ascended'>Ascended</option>
                        <option value='Legendary'>Legendary</option>
                    </select>

                    <ResetIcon className='FormItem-icon' onClick={this.resetFilter.bind(this)}/>
                    <ReloadIcon className='FormItem-icon' onClick={this.reloadItems.bind(this)}/>

                </div>
            </form>
        )
    }

}


export default SearchBar
