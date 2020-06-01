import React from 'react'
import Flashcard from './flashcard'
import Form from './form'

const Game = ({ cards, categories, onDisplayCards }) => {
  const handleDisplayCards = (categories, user, amount) => {
    onDisplayCards(categories, user, amount)
  }
  return (
    <div>
      <h1>Let's play</h1>
      <Form categories={categories} onDisplayCards={handleDisplayCards} />
      {/* 
      {cards.map(card => {
        return (
          <Flashcard
            key={card.id}
            id={card.id}
            question={card.question}
            choices={card.choices}
            answer={card.answer}
            onDisplayCards={handleDisplayCards}
          />
        )
      })} */}
      <Flashcard cards={cards} onDisplayCards={handleDisplayCards} />
    </div>
  )
}

export default Game
