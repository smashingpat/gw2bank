let initialState = ''

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.payload
        case 'RESET_FILTER':
            return initialState
        default:
            return state
    }
}

export default filters
