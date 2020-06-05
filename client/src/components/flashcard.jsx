import React from 'react'
import { Button } from 'reactstrap'

class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      questionIndex: 0,
      score: 0,
      currentQuestion: '',
      isAnswered: false,
      responses: 0,
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
      responses: this.state.responses + 1,
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
    const { isAnswered, isFlipped } = this.state

    return (
      <div className='flashcard-container'>
        <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={this.handleFlip}>
          {isFlipped ? <div className='back'>{correctAnswer}</div> : <div className='front'>{question}</div>}
        </div>
        <ul>
          {choices.map(text => {
            return (
              <div key={text}>
                <Button
                  outline
                  color='secondary'
                  name='answer'
                  value={text}
                  onClick={this.handleClick}
                  disabled={isAnswered}>
                  {text}
                </Button>
              </div>
            )
          })}
        </ul>
        <br />
        <div>{isAnswered === true && <button onClick={this.handleNextQuestion}>Next question</button>}</div>
      </div>
    )
  }
}
export default Flashcard
