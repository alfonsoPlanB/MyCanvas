export default function DrawReducer( state, action ) {
    switch (action.type) {

        case 'DRAW':
            return {
                ...state,
                draw: action.payload
            }
        default:
            return state
    }
}