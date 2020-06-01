import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Super name and title</h1>
      <Link to='/game' className='btn btn-primary'>
        Want to play?
      </Link>
    </div>
  )
}

export default HomePage
