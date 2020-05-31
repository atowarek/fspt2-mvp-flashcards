import React from 'react'

const Flashcard = ({ question, choices, answer }) => {
  return (
    <div>
      <h3>{question} </h3>
      <ul>
        <li>{choices}</li>
      </ul>
    </div>
  )
}

export default Flashcard
