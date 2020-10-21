const express = require('express');
const cors = require('cors');
require('./db/mongoose');
const usersRouter = require('./routers/users');
const tasksRouter = require('./routers/tasks');
const tickersRouter = require('./routers/tickers');
const postingsRouter = require('./routers/postings');

const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouter)
app.use(tasksRouter)
app.use(tickersRouter)
app.use(postingsRouter)

module.exports = app
