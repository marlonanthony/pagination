const express = require('express') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const app = express() 
const posts = require('./routes/posts')

// DB
const db = require('./config/keys').mongoURI
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected')) 
.catch(err => console.log(err)) 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 

// GraphQL TEST
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/', (req, res) => res.send('Hello'))

// Use Routes
app.use('/posts', posts) 

const port = process.env.PORT || 5000

app.listen(port, () => console.log('Server running on port ' + port)) 