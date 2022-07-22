import React from 'react'

const DirectorItem = ({director}) => {
  return (
    <option>{director.name}</option>
  )
}

export default DirectorItem