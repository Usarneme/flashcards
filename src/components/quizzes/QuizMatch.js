import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import QuizResults from './QuizResults'

class QuizMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentCardIndex: 0,
      cardFrontShowing: true,
      remainingCards: Object.keys(this.props.deck),
      allPossibleAnswers: Object.values(this.props.deck),
      displayedAnswersArray: [],
      // Arrays for holding stats that will be passed to the QuizResults component
      correctAnswersArray: Object.values(this.props.deck),
      inputAnswersArray: [],
      ...props
    }
    this.submitAnswer = this.submitAnswer.bind(this)
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  submitAnswer(e) {
    console.log('Submit answer clicked')
    console.log(e.target.innerHTML)

    // Add the selected answer to the answers array
    const inputAnswersArray = this.state.inputAnswersArray
    inputAnswersArray.push(e.target.innerHTML)

    // Remove the selected answer from the remaining cards array
    const remainingCards = this.state.remainingCards
    remainingCards.shift()

    // update the answers and remaining cards arrays in state
    this.setState({
      inputAnswersArray,
      remainingCards
    })
    // a new card will be displayed so we'll need to select new random possible answers
    this.setRandomAnswersArray()
  }

  // HELPER METHODS

  // get 1 correct answer + 3 random answers out of all of the possible answers 
  // to render as possible correct answers to select from as a match
  setRandomAnswersArray() {
    console.log('setRandomAnswersArray function begin.')

    // to hold the 3 random answer indices
    const tmpIndicesArray = []

    const currentCardAnswer = this.state.deck[this.state.remainingCards[0]]
    // console.log('currentCardAnswer ',currentCardAnswer)

    const currentCardAnswerIndex = this.state.allPossibleAnswers.indexOf(currentCardAnswer)
    // console.log('currentCardAnswerIndex: ',currentCardAnswerIndex)

    // Ensure the correct answer is always included in the index array
    tmpIndicesArray.push(currentCardAnswerIndex)

    // until we have four numbers that are not the same number
    while (tmpIndicesArray.length < 4) {
      let randomNumber = Math.floor(Math.random()*Object.keys(this.state.deck).length)
      if (tmpIndicesArray.indexOf(randomNumber) === -1) tmpIndicesArray.push(randomNumber)
    }

    // console.log('tmpIndicesArray populated in order: ',tmpIndicesArray)
    // console.log('Shuffling')

    // Shuffle the order so the correct answer is in a random location
    const shuffledIndicesArray = this.shuffle(tmpIndicesArray)

    // console.log('Shuffled indices array: ',shuffledIndicesArray)

    const displayedAnswersArray = shuffledIndicesArray

    // console.log('about to set state of displayedAnswersArray to:',displayedAnswersArray)

    // set the 3 random number index answers + the correct answer 
    // to state to be accessible by the render method
    this.setState({ displayedAnswersArray })
  }

  // Fisher Yates Shuffle method
  shuffle(array) {
    let counter = array.length
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter)
        // Decrease counter by 1
        counter--
        // And swap the last element with it
        let temp = array[counter]
        array[counter] = array[index]
        array[index] = temp
    }
      return array
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
    // After initial state is loaded, start loading random answers for display
    this.setRandomAnswersArray()
  }

  render() {
    if (this.state.isLoading) return ''

    console.log('Rendering QuizMatch')
    console.dir(this.state)

    console.log('this.state.remainingCards: '+this.state.remainingCards+'. this.state.currentCardIndex: '+this.state.currentCardIndex)
    const front = this.state.remainingCards[this.state.currentCardIndex]
    console.log('front: ',front)

    return (
      <div>
        <div className="header">
          <h1>
            <Link to={`/decks/${this.state.deckName}`}>{ this.state.deckName.charAt(0).toUpperCase()+this.state.deckName.slice(1) }</Link>
            <Link to={`/decks/${this.state.deckName}/quiz`}> - Quiz</Link>
            <Link to={`/decks/${this.state.deckName}/quiz/match`}> - Match</Link>
          </h1>
        </div>

        <div className="sub-header"><h2>Match Quiz...</h2></div>

        <div className="quiz-match-container grid limited-width-container">
          { this.state.remainingCards.length > 0 ?
            <div>
              <div className="card-holder card-front">
                <h3>{this.state.remainingCards[0]}</h3>
              </div>
              <div className="possible-answers grid grid-2">
                <div className="button possible-answer" onClick={e => this.submitAnswer(e)} >{this.state.allPossibleAnswers[this.state.displayedAnswersArray[0]]}</div>
                <div className="button possible-answer" onClick={e => this.submitAnswer(e)} >{this.state.allPossibleAnswers[this.state.displayedAnswersArray[1]]}</div>
                <div className="button possible-answer" onClick={e => this.submitAnswer(e)} >{this.state.allPossibleAnswers[this.state.displayedAnswersArray[2]]}</div>
                <div className="button possible-answer" onClick={e => this.submitAnswer(e)} >{this.state.allPossibleAnswers[this.state.displayedAnswersArray[3]]}</div>
              </div>
            </div>
          : <QuizResults 
              correctAnswersArray={this.state.correctAnswersArray}
              inputAnswersArray={this.state.inputAnswersArray}
              deckName={this.state.deckName}
              easyBucket={{}}
              mediumBucket={{}}
              difficultBucket={{}}
            />
          }
        </div>
      </div>
    )
  }
}

export default QuizMatch