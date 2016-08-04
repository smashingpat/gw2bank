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
        this.refs.input.value = this.props.value
    }
    render() {
        return (
            <form className='Form' onSubmit={this.onSubmitHandler.bind(this)}>
                <div className='formItem'>
                    <label className='formItem-label'>{this.props.label}</label>
                    <input className='formItem-input' style={{width: '100%'}} ref='input'/>
                </div>
            </form>
        )
    }
}

export default Input
