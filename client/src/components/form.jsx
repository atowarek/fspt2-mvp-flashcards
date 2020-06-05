import React from 'react'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      amount: 0,
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const amount = Number(this.state.amount)
    const { categories } = this.state
    const { onDisplayCards } = this.props

    onDisplayCards(categories, amount)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Choose a category:</label>
        <select name='categories' onChange={this.handleChange}>
          {this.props.categories.map(category => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            )
          })}
        </select>
        <br />
        <label>Number of questions:</label>
        <input type='number' name='amount' value={this.state.amount} onChange={this.handleChange} min='1' max='50' />
        <div>
          <button>Go!</button>
        </div>
      </form>
    )
  }
}

export default Form
