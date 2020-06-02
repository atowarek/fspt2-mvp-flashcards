import React from 'react'

class Flashcard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //questionCounter: 0,
      // choices: [],
      // answer: '',
      question: '',
      score: 0,
      //currentQuestion: '',
    }
  }

  // showCard = () => {
  //   const { cards } = this.props
  //   cards.map(card => {
  //     //const currentQuestion = cards[Math.floor(Math.random() * cards.length)]

  //     this.setState({
  //       question: card.question,
  //       // choices: card[0].choices,
  //       // answer: card[id].answer,
  //     })
  //   })
  // }
  // const questionCounter = 0
  // const currentQuestion = question[questionCounter]

  render() {
    const { id, question, choices, answer } = this.props

    return (
      <div>
        <div>{question}</div>
        <li>{choices + ' '}</li>
        <hr />

        {/* {cards.map(card => {
          //const currentQuestion = cards[Math.floor(Math.random() * cards.length)]
          return (
            <div key={card.id}>
              <div>{card.question}</div>
              <li>{card.choices}</li>
              <hr />
            </div>
          )
        })} */}
      </div>
    )
  }
}
export default Flashcard
