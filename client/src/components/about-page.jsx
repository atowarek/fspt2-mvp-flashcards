import React from 'react'
import { Jumbotron } from 'reactstrap'

const About = props => {
  return (
    <div>
      <Jumbotron>
        <h1 className='display-3'>Hello, world!</h1>
        <p className='lead'>
          Some bla bla here :) Write about: choose category, no. of Cards and flipping the flshcards!
        </p>
        <hr className='my-2' />
        <p>Write about: choose category, no. of Cards and flipping the flshcards!</p>
      </Jumbotron>
    </div>
  )
}

export default About
