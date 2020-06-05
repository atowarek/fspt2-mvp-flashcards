import React from 'react'
import Flashcard from './flashcard'
import Form from './form'
//import ModalEndGame from './modal'

class Game extends React.Component {
  state = {
    score: 0,
    user: '',
    games: [],
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      user: event.target.value,
    })
  }

  handleAddScore = isCorrect => {
    if (isCorrect) {
      this.setState({
        score: this.state.score + 1,
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    await this.handleAddScore()
    this.saveScore()
  }

  saveScore = () => {
    fetch(`http://localhost:5000/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score: this.state.score,
        user: this.state.user,
      }),
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ games: response })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render() {
    const {
      cards,
      currentQuestion,
      categories,
      questionIndex,
      amount,
      getNextQuestion,
      gameOver,
      onDisplayCards,
    } = this.props

    const currentCard = cards.filter(card => card.id === currentQuestion)

    return (
      <div>
        <h1>Let's play</h1>
        <Form categories={categories} onDisplayCards={onDisplayCards} />
        {gameOver === false &&
          currentCard.map(card => {
            return (
              <Flashcard
                key={card.id}
                id={card.id}
                question={card.question}
                choices={card.choices}
                correctAnswer={card.correctAnswer}
                addScore={this.handleAddScore}
                getNextQuestion={getNextQuestion}
                amount={amount}
                questionIndex={questionIndex}
              />
            )
          })}
        {gameOver === true && (
          <form onSubmit={this.handleSubmit}>
            <label></label>
            <input
              name='user'
              value={this.state.user}
              onChange={this.handleChange}
              placeholder='name, nickname, alias...'
              required
            />
            <br />
            <button onClick={this.handleSubmit}>Game over</button>
          </form>
        )}
      </div>
    )
  }
}

export default Game
