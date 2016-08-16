let initialState = ''

function api(state = initialState, action) {
    switch (action.type) {
        case 'ADD_API_KEY':
            return action.payload
        case 'REMOVE_API_KEY':
            return initialState
        default:
            return state
    }
}

export default api
