const initialState = []

function filtered(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_FILTERED_ITEMS':
            return action.payload
        default:
            return state
    }
}

export default filtered
