import React from 'react'
import Flashcard from './flashcard'
import Form from './form'

const Game = ({
  amount,
  questionIndex,
  currentQuestion,
  cards,
  categories,
  onDisplayCards,
  addScore,
  getNextQuestion,
}) => {
  const handleDisplayCards = (categories, user, amount) => {
    onDisplayCards(categories, user, amount)
  }

  // const handleAddScore = score => {
  //   addScore(score)
  // }

  // const handleNextQuestion = questionIndex => {
  //   getNextQuestion(questionIndex)
  // }

  const currentCard = cards.filter(card => card.id === currentQuestion)

  return (
    <div>
      <h1>Let's play</h1>
      <Form categories={categories} onDisplayCards={handleDisplayCards} />
      {currentCard.map(card => {
        return (
          <Flashcard
            key={card.id}
            id={card.id}
            question={card.question}
            choices={card.choices}
            correctAnswer={card.correctAnswer}
            onDisplayCards={handleDisplayCards}
            addScore={addScore}
            getNextQuestion={getNextQuestion}
            amount={amount}
            questionIndex={questionIndex}
          />
        )
      })}
    </div>
  )
}

export default Game
