let initialState = {}

const selectedItem = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SELECTED_ITEM':
            return {
                ...initialState,
                ...action.payload
            }
        case 'REMOVE_SELECTED_ITEM':
            return initialState
        default:
            return state
    }
}

export default selectedItem
