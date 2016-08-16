function storage(state = [], action) {
    switch (action.type) {
        case 'ADD_STORAGE':
            return action.payload
        default:
            return state
    }
}

export default storage
