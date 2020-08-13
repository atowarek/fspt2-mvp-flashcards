import React from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import he from 'he'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/home-page'
import TopScores from './components/top-scores'
import Game from './components/game'
import Navbar from './components/navbar'
import About from './components/about-page'
import { Alert } from 'reactstrap'

class App extends React.Component {
  state = {
    path: '/',
    cards: [],
    categories: [],
    amount: 0,
    currentQuestion: '',
    questionIndex: 0,
    error: false,
    gameOver: false,
    loaded: false,
  }
  componentDidMount() {
    this.getCategories()
  }

  getCategories = () => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw Error()
        }
        this.setState({ categories: response })
      })
      .catch(err => {
        this.setState({ error: true })
      })
      .finally(() => {
        this.setState({ loaded: true })
      })
  }

  handleDisplayCards = (categories, amount) => {
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${categories}&difficulty=easy&type=multiple`
    )
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw Error()
        }
        const cardsTrivia = response.results.map(card => {
          const correctAnswer = he.decode(card.correct_answer)
          const choices = [
            ...card.incorrect_answers.map(element => he.decode(element)),
            correctAnswer,
          ]
          return {
            id: uuidv4(),
            question: he.decode(card.question),
            correctAnswer,
            choices: choices.sort(() => Math.random() - 0.5),
          }
        })
        this.setState({
          currentQuestion: cardsTrivia[this.state.questionIndex].id,
          cards: cardsTrivia,
          amount,
        })
      })
      .catch(err => {
        this.setState({ error: true })
      })
      .finally(() => {
        this.setState({ loaded: true })
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
      this.setState({ gameOver: true })
    }
  }

  render() {
    const {
      cards,
      categories,
      amount,
      currentQuestion,
      questionIndex,
      gameOver,
      error,
      loaded,
    } = this.state
    return (
      <div className='App'>
        {!loaded && <p>Loading...</p>}
        {error && <Alert color='danger'>Sorry, there was an error!</Alert>}
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' children={HomePage}></Route>
            <Route exact path='/about' children={About}></Route>
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
