const userContextReducer = (state, action) => {
    console.log('user-context-reducer: action:', action.type)
    switch (action.type) {
        case 'SET-USER':
            return ({
                ...action.data,
                signedIn: action.data.signedIn
            })
        case 'UNSET-USER':
            return ({
                token: null,
                signedIn: false
            })
        case 'SET-UPLOADS':
            state._doc.uploads = action.data.uploads;
            return ({
                ...state
            })
        case 'UPDATE-USER':
            return ({
                ...state,
                [action.data.field]: action.data.value
            })
        default:
            return state;
    }
}

export default userContextReducer;