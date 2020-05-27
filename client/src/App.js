import React from 'react'
import './App.css'

class App extends React.Component {
  state = {
    users: [],
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/users')
      .then(response => response.json())
      .then(response => {
        this.setState({
          users: response,
        })
      })
  }

  render() {
    return (
      <div className='App'>
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
