/* ================================================
@@@@@@@@@@@@@@@@@@@@@**^^""~~~"^@@^*@*@@**@@@@@@@@@
@@@@@@@@@@@@@*^^'"~   , - ' '; ,@@b. '  -e@@@@@@@@@
@@@@@@@@*^"~      . '     . ' ,@@@@(  e@*@@@@@@@@@@
@@@@@^~         .       .   ' @@@@@@, ~^@@@@@@@@@@@
@@@~ ,e**@@*e,  ,e**e, .    ' '@@@@@@e,  "*@@@@@'^@
@',e@@@@@@@@@@ e@@@@@@       ' '*@@@@@@    @@@'   0
@@@@@@@@@@@@@@@@@@@@@',e,     ;  ~^*^'    ;^~   ' 0
@@@@@@@@@@@@@@@^""^@@e@@@   .'           ,'   .'  @
@@@@@@@@@@@@@@'    '@@@@@ '         ,  ,e'  .    ;@
@@@@@@@@@@@@@' ,&&,  ^@*'     ,  .  i^"@e, ,e@e  @@
@@@@@@@@@@@@' ,@@@@,          ;  ,& !,,@@@e@@@@ e@@
@@@@@,~*@@*' ,@@@@@@e,   ',   e^~^@,   ~'@@@@@@,@@@
@@@@@@, ~" ,e@@@@@@@@@*e*@*  ,@e  @@""@e,,@@@@@@@@@
@@@@@@@@ee@@@@@@@@@@@@@@@" ,e@' ,e@' e@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@" ,@" ,e@@e,,@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@~ ,@@@,,0@@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@,,@@@@@@@@@@@@@@@@@@@@@@@@@
================================================ */

import css from 'dom-css'


let initialOptions = {
    element: null,
    container: null
}

const Dragon = (options = initialOptions) => {
    let reqId
    let mouseDown = false

    let element      = options.element
    let container    = options.container
    let mousePosX
    let mousePosY
    let elementPosX
    let elementPosY


    let cache = {
        mousePosX,
        mousePosY
    }

    function moveElement() {
        css(element, {
            'transform': `translateY(${mousePosY - elementPosY}px)`
        })
    }

    function frame() {
        if ( mousePosX !== cache.mousePosX && mousePosY !==  cache.mousePosY ) {
            // refreshes cache
            cache = {
                ...cache,
                mousePosX,
                mousePosY
            }
            moveElement()
        }
        reqId = requestAnimationFrame(frame)
    }


    function run() {
        setEventHandlers()
        update()
    }

    function update() {
        getElementPosition()
    }

    function getElementPosition() {
        let bounding = element.getBoundingClientRect()
        elementPosX = bounding.left
        elementPosY = bounding.top
    }

    function setEventHandlers() {
        window.addEventListener('mousedown', mouseDownHandler)
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('mouseup',   mouseUpHandler)
        window.addEventListener('scroll',    scrollHandler)
    }

    function mouseDownHandler(event) {
        mouseDown = true
        mousePosX = event.clientX
        mousePosY = event.clientY
        requestAnimationFrame(frame)
    }

    function mouseMoveHandler(event) {
        if (mouseDown) {
            mousePosX = event.clientX
            mousePosY = event.clientY
        }
    }

    function mouseUpHandler(event) {
        mouseDown = false
        cancelAnimationFrame(reqId)
    }

    function scrollHandler(event) {
        getElementPosition()
    }

    run()
}


export default Dragon
