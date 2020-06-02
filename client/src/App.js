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
        const cardsTrivia = response.results.map(card => {
          const answer = he.decode(card.correct_answer)
          const choices = [...card.incorrect_answers.map(element => he.decode(element)), answer]
          return {
            id: uuidv4(), //?
            question: he.decode(card.question),
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
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/game' component={Game}>
              <Game
                cards={cards}
                categories={categories}
                user={user}
                amount={amount}
                onDisplayCards={this.handleDisplayCards}
              />
            </Route>
            <Route path='/topscores' component={TopScores}>
              <TopScores games={games} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
