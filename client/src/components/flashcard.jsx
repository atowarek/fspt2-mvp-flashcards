import React from 'react'
import { CardSubtitle } from 'reactstrap'

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
    const { cards } = this.props

    return (
      <div>
        {cards.map(card => {
          //const currentQuestion = cards[Math.floor(Math.random() * cards.length)]
          return (
            <div key={card.id}>
              <span>{card.question}</span>
              <ul>
                <li>{card.choices}</li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}
export default Flashcard
