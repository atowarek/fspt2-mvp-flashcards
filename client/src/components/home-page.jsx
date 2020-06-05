import React from 'react'
import { Link } from 'react-router-dom'
import dice from '../dice.jpg'

const HomePage = () => {
  return (
    <div className='container'>
      <img src={dice}></img>
      <Link to='/game' className='btn btn-primary'>
        Want to play?
      </Link>
    </div>
  )
}
export default HomePage
