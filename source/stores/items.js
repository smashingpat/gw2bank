function items(state = [], action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return state.concat(action.payload)
        default:
            return state
    }
}

export default items
