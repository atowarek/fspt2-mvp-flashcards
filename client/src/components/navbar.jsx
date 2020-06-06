import React from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div className='nav'>
        <div>
          <NavLink exact activeClassName='active-page' to='/'>
            Homepage
          </NavLink>
        </div>
        <div>
          <NavLink exact activeClassName='active-page' to='/about'>
            How it works
          </NavLink>
        </div>
        <div>
          <NavLink exact activeClassName='active-page' to='/game'>
            Play
          </NavLink>
        </div>
        <div>
          <NavLink activeClassName='active-page' to='/topscores'>
            Top Scores
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar
