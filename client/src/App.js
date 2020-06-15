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
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw Error()
        }
        // if you had an error first and then retry for xyz reason, you will still show the error, so reseting the error here might be userful
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
    // my recommendation would be to abstract this from your component (see my PR comment)
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categories}&difficulty=easy&type=multiple`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          throw Error()
        }

        // abstract the "parsing" part of this function to another one will make the code more readable
        const cardsTrivia = response.results.map(card => {
          const correctAnswer = he.decode(card.correct_answer)
          const choices = [...card.incorrect_answers.map(element => he.decode(element)), correctAnswer]
          return {
            id: uuidv4(),
            question: he.decode(card.question),
            correctAnswer,
            // interesting so the order is random too
            choices: choices.sort(() => Math.random() - 0.5),
          }
        })
        // remember if you depend on the previous state to use the function type setState
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
    const { cards, categories, amount, currentQuestion, questionIndex, gameOver, error, loaded } = this.state
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
