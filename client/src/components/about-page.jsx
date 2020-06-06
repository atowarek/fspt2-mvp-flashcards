import React from 'react'
import { Jumbotron } from 'reactstrap'

const About = props => {
  return (
    <div>
      <Jumbotron className='about'>
        <h3 className='display-5'>Welcome to My flashcards!</h3>
        <br />
        <p className='lead'>
          This game-based MVP was built to make learning fun!
          <br />
          You can choose up to 50 questions from one of <b>24 available categories</b> (from 'General knowledge' to
          'Cartoon & Animations').
          <br />
          For every correct answer you get <b>1 point</b>. <br />
        </p>
        <hr />
        <p className='lead'>
          If you answer incorrectly, don't forget to <b>FLIP THE CARD</b>, to get the correct answer!
          <br />
          Have fun!
        </p>
      </Jumbotron>
    </div>
  )
}

export default About
