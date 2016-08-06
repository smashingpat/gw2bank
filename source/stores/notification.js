const initialState = {
    message: '',
    type: ''
}

function error(state = initialState, action) {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            let data = {
                ...initialState,
                ...action.payload
            }
            return data
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export default error
