const express = require('express')
const mongoose = require('mongoose')
const upload = require('./Server/Uploads')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./Server/GraphQL/Schema')
require('dotenv').config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(err))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.use('/upload', upload)

app.listen(4000, () => console.log('server Connected'))