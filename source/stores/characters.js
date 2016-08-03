function characters(state = [], action) {
    switch (action.type) {
        case 'ADD_CHARACTERS':
            return action.payload
        default:
            return state
    }
}

export default characters
