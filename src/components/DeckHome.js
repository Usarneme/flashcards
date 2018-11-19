import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import Review from './Review'
import Quiz from './Quiz'
import Edit from './Edit'

class DeckHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      keysArray: [],
      currentDeckName: '',
      currentDeckCards: {}, 
      currentCardIndex: 0,
      ...props
    }
  }

  // need to load the URL params before setting state and rendering Links/Routes
  componentDidMount() {
    let url = this.props.match.url.trim()
    // Remove a trailing slash eg: /decks/spanish/ -> /decks/spanish
    if (url[url.length-1] === '/') { url = url.substring(0, this.props.match.url.length-1) }
    console.log('CDM DeckHome. url',url)

    const lastSlashIndex = url.lastIndexOf('/')+1
    const deckNameLength = url.length

    // pull the deck name out of the url
    const currentDeckName = url.substring(lastSlashIndex, deckNameLength)
    const currentDeckCards = this.props.decks[currentDeckName]

    // keys array makes it easier to prevent going below 0 or beyond the final card in the deck
    const keysArray = Object.keys(currentDeckCards)

    console.log('currentDeckName: '+currentDeckName+'.\tkeysArray: '+keysArray)

    this.setState({ 
      isLoading: false,
      currentDeckName, 
      currentDeckCards,
      currentCardIndex: 0,
      keysArray
    })
  }

  render() {
    console.log('Rendering DeckHome')
    console.dir(this.props)

    // Don't render while loading the component, props, and URL params
    if (this.state.isLoading) return ''
  
    return (
      <div className="deck-home">
        <div className="header">
          {/* Capitalize the first letter in the displayed deck name */}
          <Link to={`${this.props.match.url}`}><h1>{ this.state.currentDeckName.charAt(0).toUpperCase()+this.state.currentDeckName.slice(1) }</h1></Link>
        </div>
        <div className="break"></div>
  
        <div className="grid grid-3">
          <Link to={`${this.props.match.url}/review`} className="button">Review</Link>
          <Link to={`${this.props.match.url}/quiz`} className="button">Quiz</Link>
          <Link to={`${this.props.match.url}/edit`} className="button">Edit</Link>
        </div>

        <Route 
          exact path={`${this.props.match.url}/`} 
          render={() => {
            return (
              <div>
                <div className="sub-header">
                  <h2>Cards...</h2>
                </div>
                { Object.keys(this.state.currentDeckCards).map((card, index) => {
                  return (
                    <div className="card-holder grid grid-2" key={index} >
                      <strong>{card}</strong>
                      <div><p>{this.state.currentDeckCards[card]}</p></div>
                    </div>
                    )
                  })
                }
              </div>
            )
          }}
        />
        <Route exact path={`${this.props.match.url}/review`} render={() => <Review deckName={this.state.currentDeckName} deck={this.state.currentDeckCards} />} />
        <Route exact path={`${this.props.match.url}/quiz`} render={() => <Quiz deckName={this.state.currentDeckName} deck={this.state.currentDeckCards} />} />
        <Route exact path={`${this.props.match.url}/edit`} render={() => <Edit deckName={this.state.currentDeckName} deck={this.state.currentDeckCards} />} />
      </div>
    )
  }
}

export default withRouter(DeckHome)