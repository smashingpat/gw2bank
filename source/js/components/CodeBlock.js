import React from 'react'
import ReactDom from 'react-dom'
import highlight from 'highlight.js'


export default class extends React.Component {
    componentDidMount() {
        this.highlightCode()
    }
    componentDidUpdate() {
        this.highlightCode()
    }
    highlightCode() {
        let domNode = ReactDom.findDOMNode(this);
        let nodes = domNode.querySelectorAll('pre code');
        console.log(nodes);
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                highlight.highlightBlock(nodes[i])
            }
        }
    }
    render() {
        return (
            <pre><code>{this.props.children}</code></pre>
        )
    }
}
