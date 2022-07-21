import React from 'react'
import store from './redux-components/store'

const ProtectedPath = () => {
    console.log('auth status is ' + store.getState().authStatus);
  return (
    store.getState().authStatus ? <div>Authenticated with id: {store.getState().id}</div> : <div>u are not authenticated</div>
  )
}

export default ProtectedPath