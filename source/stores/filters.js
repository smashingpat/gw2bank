let initialState = ''

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return action.payload
        default:
            return state
    }
}

export default filters
