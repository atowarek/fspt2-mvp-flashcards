import React from 'react'
import { Button } from 'reactstrap'

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
      <form className='form-header' onSubmit={this.handleSubmit}>
        <div className='form-group'></div>
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
        <label>Number of questions:</label>
        <input
          type='number'
          name='amount'
          value={this.state.amount}
          onChange={this.handleChange}
          min='1'
          max='50'
          width='150'
        />
        <div>
          <Button color='primary'>Go!</Button>
        </div>
      </form>
    )
  }
}

export default Form
