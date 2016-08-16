import css from 'dom-css'

const container = document.createElement('div')
const element   = document.createElement('h3')

container.appendChild(element)
element.innerHTML = 'HELLO WORLD'

document.body.appendChild(container)

css(container, {
    width: 500,
    height: 500,
    background: 'white',
    margin: '50px auto',
    position: 'relative',
    zIndex: 9999
})

css(element, {
    background: 'red',
    display: 'inline-block',
    position: 'absolute',
    top: 100,
    left: 120,
    whiteSpace: 'nowrap'
})

import Dragon from './utilities/dragon'

Dragon({
    element
})
