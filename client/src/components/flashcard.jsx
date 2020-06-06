import React from 'react'
import { Button, Alert } from 'reactstrap'

class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      score: 0,
      currentQuestion: '',
      isAnswered: false,
      isCorrect: false,
      isFlipped: false,
    }
  }

  handleClick = event => {
    event.preventDefault()
    const { addScore, correctAnswer } = this.props
    const answer = event.target.value
    const isCorrect = answer === correctAnswer

    if (isCorrect) {
      console.log(`${answer}: ${correctAnswer}`)
      this.setState({
        isCorrect: true,
      })
    } else {
      console.log(`Incorrect ${answer}, correct: ${correctAnswer}`)
    }
    this.setState({
      isAnswered: true,
    })
    addScore(isCorrect)
  }

  handleNextQuestion = () => {
    const { getNextQuestion } = this.props
    const { questionIndex } = this.state

    this.setState({
      questionIndex: this.state.questionIndex + 1,
    })
    getNextQuestion(questionIndex)
  }

  handleFlip = () => {
    this.setState(state => ({
      isFlipped: !state.isFlipped,
    }))
  }

  render() {
    const { question, choices, correctAnswer } = this.props
    const { isAnswered, isFlipped, isCorrect } = this.state

    return (
      <>
        <Alert color='primary'>
          {!isAnswered ? (
            <h3>Click the correct answer</h3>
          ) : isCorrect ? (
            <h3>That is correct! You get 1 point!</h3>
          ) : (
            <h3>Not really. Flip the card!</h3>
          )}
        </Alert>
        <div className='flashcard-container'>
          <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={this.handleFlip} disabled={!isAnswered}>
            {isFlipped ? <div className='back'>{correctAnswer}</div> : <div className='front'>{question}</div>}
          </div>
          <div className='choices-container'>
            {choices.map(text => {
              return (
                <div key={text}>
                  <Button
                    outline
                    color='secondary'
                    size='lg'
                    name='answer'
                    value={text}
                    onClick={this.handleClick}
                    disabled={isAnswered}>
                    {text}
                  </Button>
                </div>
              )
            })}
            <Button color='primary' size='lg' onClick={this.handleNextQuestion} disabled={!isAnswered}>
              Next question
            </Button>
          </div>
        </div>
      </>
    )
  }
}
export default Flashcard
