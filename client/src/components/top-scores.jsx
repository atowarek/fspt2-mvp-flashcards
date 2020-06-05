import React from 'react'
import { Table } from 'reactstrap'

class TopScores extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      error: false,
      games: [],
    }
  }
  componentDidMount() {
    this.getScores()
  }
  getScores = () => {
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

  render() {
    return (
      <>
        <h1>TopScores</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Top Scores</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.games.map(game => {
              return (
                <tr key={game.gameId}>
                  <td> {game.score}</td>
                  <td>{game.user} </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </>
    )
  }
}
export default TopScores
