import React from 'react'


const filterForm = React.createClass({
    onSubmitHandler(event) {
        event.preventDefault()
        let input = this.refs.input

        this.props.onSubmit(input.value)
    },
    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <input ref='input'/>
                <button type='submit'>Submit</button>
            </form>
        )
    }
})

export default filterForm
