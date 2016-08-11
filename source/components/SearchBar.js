import React from 'react'
import { connect } from 'react-redux'

import ResetIcon from 'react-icons/lib/go/x'

import { changeFilter, resetFilter } from '../actions'

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

    render() {
        return (
            <form className={`Form ${this.props.className}`} onSubmit={this.setFilter.bind(this)}>
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
                </div>
            </form>
        )
    }

}


export default SearchBar
