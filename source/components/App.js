import React from 'react'
import {connect} from 'react-redux'

import API from '../API'
import { setApi, changeFilter } from '../actions'


class App extends React.Component {
    componentDidMount() {
        this.setApiKey()
    }

    setFilter(event) {
        event.preventDefault()
        this.props.dispatch(changeFilter(this.refs.input.value))
        this.refs.input.value = ''
    }

    setApiKey() {
        this.props.dispatch(setApi('068C2B8B-9929-9842-9907-88C3FAD88A77088C3179-1451-4D22-AD8B-F80CD4E44072'))
    }

    render() {
        let props = this.props
        return (
            <div>
                <form onSubmit={this.setFilter.bind(this)}>
                    <input ref='input' />
                </form>
                <div>
                    {props.characters.map(character => (
                        <div key={character.name}>
                            <div>{character.name}</div>
                            {character.items.map((item, index) => (
                                <div key={`${item}${index}`}>{item.id} '({item.count})'</div>
                            ))}
                        </div>
                    ))}
                </div>
                <pre><code>{JSON.stringify(props, null, 2)}</code></pre>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        api: store.api,
        items: store.items,
        filter: store.filters,
        characters: store.characters
    }
})(App)
