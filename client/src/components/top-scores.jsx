import React from 'react'
import { Table } from 'reactstrap'

const TopScores = ({ games }) => {
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
          {games.map(game => {
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

export default TopScores
