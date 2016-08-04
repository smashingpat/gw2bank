import React from 'react'

class Input extends React.Component {
    onSubmitHandler(event) {
        event.preventDefault()
        let value = this.refs.input.value
        if (this.props.onSubmit) {
            this.props.onSubmit(value)
        }
    }
    componentDidUpdate() {
        console.log(this.props.value);
        this.refs.input.value = this.props.value
    }
    render() {
        return (
            <form onSubmit={this.onSubmitHandler.bind(this)}>
                <input style={{width: '100%'}} ref='input'/>
            </form>
        )
    }
}

export default Input
