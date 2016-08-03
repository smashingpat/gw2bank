function bank(state = [], action) {
    switch (action.type) {
        case 'ADD_BANK':
            return action.items
        default:
            return state
    }
}

export default bank
