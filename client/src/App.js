import React from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import he from 'he'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/home-page'
import TopScores from './components/top-scores'
import Game from './components/game'
import Navbar from './components/navbar'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      path: '/',
      cards: [],
      categories: [],
      amount: 0,
      error: false,
      currentQuestion: '',
      questionIndex: 0,
      gameOver: false,
    }
  }

  componentDidMount() {
    this.getCategories()
  }

  getCategories = () => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(response => {
        this.setState({ categories: response })
        //console.log(response)
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  handleDisplayCards = (categories, amount) => {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categories}&type=multiple`)
      .then(response => response.json())
      .then(response => {
        const cardsTrivia = response.results.map(card => {
          const correctAnswer = he.decode(card.correct_answer)
          const choices = [...card.incorrect_answers.map(element => he.decode(element)), correctAnswer]
          return {
            id: uuidv4(),
            question: he.decode(card.question),
            correctAnswer,
            choices: choices.sort(() => Math.random() - 0.5),
          }
        })
        //console.log(cardsTrivia)
        this.setState({
          currentQuestion: cardsTrivia[this.state.questionIndex].id,
          cards: cardsTrivia,
          amount,
        })
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  handleNextQuestion = () => {
    if (this.state.questionIndex < this.state.cards.length - 1) {
      const newIndex = this.state.questionIndex + 1
      this.setState({
        questionIndex: newIndex,
        currentQuestion: this.state.cards[newIndex].id,
      })
    } else {
      this.setState({
        gameOver: true,
      })
    }
  }

  render() {
    const { cards, categories, amount, currentQuestion, questionIndex, gameOver } = this.state
    return (
      <div className='App'>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/game' component={Game}>
              <Game
                currentQuestion={currentQuestion}
                questionIndex={questionIndex}
                cards={cards}
                categories={categories}
                amount={amount}
                onDisplayCards={this.handleDisplayCards}
                getNextQuestion={this.handleNextQuestion}
                gameOver={gameOver}
              />
            </Route>
            <Route exact path='/topscores' component={TopScores}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
