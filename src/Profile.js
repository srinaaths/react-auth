import React from 'react'
import { withRouter } from 'react-router-dom'

function Profile() {
  return (
    <div>
        {console.log('in profile')}
        authenticated
    </div>
  )
}

export default withRouter(Profile)