function api(state = '', action) {
    switch (action.type) {
        case 'ADD_API_KEY':
            return action.payload
        default:
            return state
    }
}

export default api
