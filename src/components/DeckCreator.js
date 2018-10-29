import React from 'react'
import PropTypes from 'prop-types'

import CardCreator from './CardCreator'

import '../styles/DeckCreator.css'

class DeckCreator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deckName: '',
      // Has the user named the new deck yet?
      deckNameSubmitted: false,
      cards: {},
      currentDeckNames: props.currentDeckNames
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addCard = this.addCard.bind(this)
    this.cancelSave = this.cancelSave.bind(this)
  }

  static propTypes = {
    addDeck: PropTypes.func.isRequired,
    currentDeckNames: PropTypes.array.isRequired
  }

  handleChange(event) {
    this.setState({ deckName: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.currentDeckNames.includes(this.state.deckName)) {
      alert('You already have a deck by that name. Try another name.')
      return
    }
    this.setState({ deckNameSubmitted: true })
  }

  addCard(card) {
    if (!card.front) return
    if (!card.back) return

    if (Object.keys(this.state.cards).includes(card.front)) {
      alert('You already have a card by that name. Try another name.')
      return
    }

    const tmpCards = {...this.state.cards, [card.front]: card.back}
    this.setState({ cards: tmpCards })
  }

  cancelSave() {
    this.setState({
      deckName: '',
      deckNameSubmitted: false,
      cards: {}
    })
  }

  componentDidMount(){
    this.deckNameInput.focus()
  }

  render() {
    return (
      <div className="deck-creator-container">
        <h3>Deck Creator</h3>
        { !this.state.deckNameSubmitted ? 
          <form onSubmit={this.handleSubmit} className="grid-parent" >
            <label>
              <input 
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange} 
                ref={(input) => { this.deckNameInput = input }}
                placeholder="Name your new flashcard deck"
              />
            </label>
            <input type="submit" value="Create Deck" className="button create-deck" />
          </form> 
          : <div></div>
        }

        { 
          this.state.deckNameSubmitted ? 
            <div className="card-creator-container">
              <CardCreator 
                deckName={this.state.deckName} 
                addCard={this.addCard} /> 
              <button className="save-deck" onClick={e => this.props.addDeck({name: this.state.deckName, cards: this.state.cards}) }>Save Deck</button>
              <button className="cancel-create-deck" onClick={this.cancelSave}>Cancel</button>
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default DeckCreator