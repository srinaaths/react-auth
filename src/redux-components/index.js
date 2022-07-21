import React from 'react'
import store from './store'

const index = () => {
    store.dispatch({
        type: 'USER_LOGIN',
        payload: {
            id: 1,
            isAdmin: true,
            authStatus: true,
            token: 'kdfjsl'
        }
    })
    console.log(store.getState());
}

export default index