let initialState = false

const isLoading = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LOADING_STATE':
            return action.payload
        default:
            return state
    }
}

export default isLoading
