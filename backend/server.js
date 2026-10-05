// Main server file - starts everything - Owner: STANLEY

const express = require('express')
const cors = require('cors')
const session = require('express-session')
const path = require('path')
const config = require('./config')

const app = express()

app.use(cors({ origin: config.frontendUrl, credentials: true }))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 86400000 }
}))

app.use('/uploads', express.static(config.uploadsDir))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/paintings', require('./routes/paintings'))
app.use('/api/favourites', require('./routes/favourites'))
app.use('/api/dashboard', require('./routes/dashboard'))
app.use('/api/analytics', require('./routes/analytics'))

function sendHealth(req, res) {
  res.json({ ok: true, message: 'ArtMind server is running' })
}

app.get('/api/health', sendHealth)

function sendNotFound(req, res) {
  res.status(404).json({ error: 'That API address does not exist' })
}

app.use('/api', sendNotFound)

function sendServerError(err, req, res, next) {
  console.log('Server error:', err.message)
  res.status(500).json({ error: 'Something went wrong on the server' })
}

app.use(sendServerError)

function showStartMessage() {
  console.log('ArtMind server is running on http://localhost:' + config.port)
}

app.listen(config.port, showStartMessage)
