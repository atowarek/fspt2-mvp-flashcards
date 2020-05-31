import React from 'react'

const TopScores = ({ games }) => {
  return (
    <div className='App'>
      <h1>TopScores</h1>
      {games.map(game => {
        return (
          <li key={game.gameId}>
            {game.user} {game.score}
          </li>
        )
      })}
    </div>
  )
}

export default TopScores
