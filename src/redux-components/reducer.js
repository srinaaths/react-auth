const inititalState = {
    id: null,
    isAdmin: false,
    authStatus: false,
    token: null
}
const reducer = (state = null, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            console.log('in login');
            return {
              id: action.payload.id,
              isAdmin: action.payload.isAdmin,  
              authStatus: action.payload.authStatus,  
              token: action.payload.token,  
            }

        case 'USER_LOGOUT':
            console.log('in logout');
            return null;

        default:
            console.log('in default');
            return state;
    }
}

export default reducer