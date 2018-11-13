import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Root from './containers/Root'

import registerServiceWorker from './registerServiceWorker'

render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
