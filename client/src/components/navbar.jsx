import React from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink exact activeClassName='active-page' to='/'>
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active-page' to='/game'>
            Play
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='active-page' to='/topscores'>
            Top Scores
          </NavLink>
        </li>
      </ul>
    )
  }
}

export default Navbar
