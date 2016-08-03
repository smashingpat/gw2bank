function bank(state = [], action) {
    switch (action.type) {
        case 'ADD_BANK':
            return action.payload
        default:
            return state
    }
}

export default bank
