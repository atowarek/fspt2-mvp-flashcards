import React from 'react'
import Flashcard from './flashcard'
import Form from './form'
import { Alert, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

class Game extends React.Component {
  state = {
    score: 0,
    user: '',
    games: [],
    error: false,
    scoreSubmitted: false,
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
    this.setState({
      scoreSubmitted: true,
    })
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
        if (response.error) {
          throw Error()
        }
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
        {this.state.error && <Alert color='danger'>Sorry, there was an error!</Alert>}
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
          <Alert color='success' align-items='center'>
            <h3 className='alert-heading'>Well done!</h3>
            <p>
              You did great! <br />
              Write your name (or nickname) and become one of your TOP PLAYERS!
              <form onSubmit={this.handleSubmit}>
                <input
                  name='user'
                  value={this.state.user}
                  onChange={this.handleChange}
                  placeholder='name, nickname, alias...'
                  required
                />
                <hr />
                <Button className='btn btn-success' onClick={this.handleSubmit}>
                  Click here!
                </Button>
              </form>
            </p>
            <hr />
            <p className='mb-0'> Your final score is {this.state.score}</p>
          </Alert>
        )}
        {this.state.scoreSubmitted && <Link to='/topscores'>Great! Now check the TOP PLAYERS</Link>}
      </div>
    )
  }
}

export default Game
