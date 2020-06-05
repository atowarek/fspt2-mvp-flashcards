import React from 'react'

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

  render() {
    const { question, choices } = this.props
    const { isAnswered, responses } = this.state

    return (
      <div>
        <div>{question}</div>
        <ul>
          {choices.map(text => {
            return (
              <div key={text}>
                <button name='answer' value={text} onClick={this.handleClick}>
                  {text}
                </button>
              </div>
            )
          })}
        </ul>
        <div>Responses: {responses}</div>
        <div>Your score: {this.state.score}</div>
        <hr />
        {isAnswered === true && <button onClick={this.handleNextQuestion}>Next question</button>}
      </div>
    )
  }
}
export default Flashcard
