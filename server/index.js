// Package Includes
const express     = require('express')
const bodyParser  = require('body-parser')
const app         = express()
const cors        = require('cors')
/// To do: Axios for server -> server communication (facebook)

const port = 3000

const users = require('./controllers/users')
const userContactMethods = require('./controllers/user-contact-methods')
const userFriends = require('./controllers/user-friends')
const exercises = require('./controllers/exercises')
const userExercises = require('./controllers/user-exercises')
const userStepCount = require('./controllers/user-step-counts')

const userModel     = require('./models/user');

// Allow app to parse json
app.use(bodyParser.json())

// Allow app to use cors
app.use(cors())

app.use(function(req, res, next) {
 /* console.log(req);
  try {
    console.log(req.headers.authorization);
    const token = (req.headers.authorization || "").split(' ')[1]
    console.log(token);
    req.user = userModel.getFromToken(token);
  } catch (error) {
    console.log(error);
    const openActions = ['POST/users', 'POST/users/register', 'POST/users/login', 'GET/login', 'GET/myfriends']
    if(req.method != "OPTIONS" && !openActions.includes(req.method + req.path.toLowerCase())){ // check if login required
      next(Error("Login Required"));
    }
  }
  */
  next();
});

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/users', users);

app.use('/usercontactmethods', userContactMethods)

app.use('/userfriends', userFriends);
 
app.use('/exercises', exercises);

app.use('/userexercises', userExercises);

app.use('/userstepcounts', userStepCount);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({message: err.message });
})

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`)
)