// Your basic Express JS node server
import express from 'express'
import path from 'path'
const app = express()

//
// Back End Server Action
//
app.post('/register', function(req, res) {
  console.log("Register route posted to with req")
  console.dir(req)
  const { email, password } = req.body
})

//
// Front End Static-Built Routes
//
// Pulls source from the production build folder
app.use(express.static(path.join(__dirname, '../build')))

// All routes go to the Index.html file
// The project uses React Router 4 to handle routing so it is not necessary to duplicate this in Express. 
// RR4 will reroute to the appropriate URL as entered/navigated to within the app.
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

// Your basic DBZ Port
app.listen(9001, () => console.log("Flashy App Express Server listening on port 9001."))