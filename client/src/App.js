import React from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/home'
import TopScores from './components/top-scores'
import Game from './components/game'
import Navbar from './components/navbar'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      path: '/',
      games: [],
      cards: [],
      categories: [],
      amount: '',
      error: false,
      user: '',
    }
  }

  componentDidMount() {
    this.getApis()
  }

  getApis = () => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(response => {
        this.setState({
          categories: response,
        })
        console.log(response)
      })
      .catch(err => {
        this.setState({ error: true })
      })

    fetch('http://localhost:5000/api/games')
      .then(response => response.json())
      .then(response => {
        this.setState({
          games: response,
        })
        console.log(response)
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  handleDisplayCards = (categories, user, amount) => {
    const params = {
      amount: this.state.amount,
      category: this.state.categories,
    }
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categories}&type=multiple`, params)
      .then(response => response.json())
      .then(response => {
        const cardsTrivia = response.results.map((card, index) => {
          const answer = card.correct_answer
          const choices = [...card.incorrect_answers, answer]
          return {
            id: uuidv4(), //?
            question: card.question,
            answer: answer,
            choices: choices.sort(() => Math.random() - 0.5),
          }
        })
        console.log(cardsTrivia)
        this.setState({
          cards: cardsTrivia,
          user: user,
          amount: amount,
        })
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  render() {
    const { games, cards, categories, user, amount } = this.state
    return (
      <div className='App'>
        <Router>
          <Navbar />

          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/game'>
              <Game
                cards={cards}
                categories={categories}
                user={user}
                amount={amount}
                onDisplayCards={this.handleDisplayCards}
              />
            </Route>
            <Route path='/topscores'>
              <TopScores games={games} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
