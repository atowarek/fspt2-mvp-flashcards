import React from 'react'
import { Table } from 'reactstrap'

class TopScores extends React.Component {
  state = {
    games: [],
    error: false,
  }
  componentDidMount() {
    this.getScores()
  }
  getScores = () => {
    fetch('http://localhost:5000/api/games')
      .then(response => response.json())
      .then(response => {
        this.setState({ games: response })
      })
      .catch(err => {
        this.setState({ error: true })
      })
  }

  render() {
    return (
      <div className='scores-container'>
        <h2>Our top players!</h2>
        <Table hover>
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
                  <td>
                    <b> {game.score}</b>
                  </td>
                  <td>{game.user} </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default TopScores
