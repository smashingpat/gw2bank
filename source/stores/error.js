const initialState = ''

function error(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ERROR':
            return action.payload
        case 'REMOVE_ERROR':
            return ''
        default:
            return state
    }
}

export default error
