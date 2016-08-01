import React from 'react'


const filterForm = React.createClass({
    onSubmitHandler(event) {
        event.preventDefault()
        let input = this.refs.input

        this.props.onSubmit(input.value)
    },
    render() {
        let id = this.props.label;
        return (
            <form className='Form' onSubmit={this.onSubmitHandler}>
                <div className='FormItem'>
                    <label className='FormItem-label'>{this.props.label}</label>
                    <input className='FormItem-input' ref='input'/>
                    <button className='FormItem-button' type='submit'>Submit</button>
                </div>
                <div>{this.props.children}</div>
            </form>
        )
    }
})

export default filterForm
