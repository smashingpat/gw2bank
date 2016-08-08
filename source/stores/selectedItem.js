let initialState = {
    // name: 'Test',
    // description: 'Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

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
