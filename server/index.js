const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const users = require('./controllers/users')
const userContactMethods = require('./controllers/user-contact-methods')
const userFriends = require('./controllers/user-friends')
const exercises = require('./controllers/exercises')
const userExercises = require('./controllers/user-exercises')
const userStepCount = require('./controllers/user-step-counts')

// Allow app to parse json
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/users', users);

app.use('/usercontactmethods', userContactMethods)

app.use('/userfriends', userFriends);
 
app.use('/exercises', exercises);

app.use('/userexercises', userExercises);

app.use('/userstepcounts', userStepCount);


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`)
)