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
      amount: 0,
      error: false,
      user: '',
      currentQuestion: '',
      questionIndex: 0,
      score: 0,
    }
  }

  componentDidMount() {
    this.getApis()
  }

  getApis = () => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(response => {
        this.setState({ categories: response })
        console.log(response)
      })
      .catch(err => {
        this.setState({ error: true })
      })

    fetch('http://localhost:5000/api/games')
      .then(response => response.json())
      .then(response => {
        this.setState({ games: response })
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
          const correctAnswer = he.decode(card.correct_answer)
          const choices = [...card.incorrect_answers.map(element => he.decode(element)), correctAnswer]
          return {
            id: uuidv4(),
            question: he.decode(card.question),
            correctAnswer,
            choices: choices.sort(() => Math.random() - 0.5),
          }
        })
        console.log(cardsTrivia)

        this.setState({
          currentQuestion: cardsTrivia[0].id,
          cards: cardsTrivia,
          user,
          amount,
        })
      })

      .catch(err => {
        this.setState({ error: true })
      })
  }

  handleNextQuestion = questionIndex => {
    //if (this.state.questionIndex > this.state.amount) return

    this.setState({
      questionIndex,
      currentQuestion: this.state.cards[this.state.questionIndex].id,
    })

    console.log(`questionIndex ${questionIndex} on App`)
  }

  handleAddScore = (score, user) => {
    this.setState({
      user,
      score,
    })
    console.log(`Score ${score} on App`)
  }

  // handleAddScore = (score, user) => {
  //   fetch(`http://localhost:5000/api/games`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ score, user }),
  //   })
  //     .then(response => response.json())
  //     // .then(() => {
  //     //   this.getStudents()
  //     // })
  //     .then(response => {
  //       this.setState({ games: response })
  //     })
  //     .catch(() => {
  //       this.setState({ error: true })
  //     })
  // }

  render() {
    const { games, cards, categories, user, amount, score, currentQuestion, questionIndex } = this.state

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
                user={user}
                score={score}
                amount={amount}
                onDisplayCards={this.handleDisplayCards}
                addScore={this.handleAddScore}
                getNextQuestion={this.handleNextQuestion}
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
