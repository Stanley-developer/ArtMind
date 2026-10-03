// Register, login, logout - Owner: STANLEY

const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../database/db')

const router = express.Router()

function findUserById(id) {
  return db.one(
    'SELECT id, username, email, is_admin FROM users WHERE id = ?',
    [id]
  )
}

function isEmpty(value) {
  if (value === undefined || value === null) {
    return true
  }
  if (String(value).trim() === '') {
    return true
  }
  return false
}

router.post('/register', function (req, res) {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({ error: 'Please fill in every field' })
  }

  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' })
  }

  if (email.indexOf('@') === -1) {
    return res.status(400).json({ error: 'That email address does not look right' })
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }

  const usernameTaken = db.one(
    'SELECT id FROM users WHERE username = ?',
    [username]
  )

  if (usernameTaken) {
    return res.status(400).json({ error: 'That username is already taken' })
  }

  const emailTaken = db.one(
    'SELECT id FROM users WHERE email = ?',
    [email]
  )

  if (emailTaken) {
    return res.status(400).json({ error: 'That email address is already registered' })
  }

  const passwordHash = bcrypt.hashSync(password, 10)

  const result = db.run(
    'INSERT INTO users (username, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
    [username, email, passwordHash, 0]
  )

  const newUserId = Number(result.lastInsertRowid)
  const newUser = findUserById(newUserId)

  req.session.userId = newUserId

  res.json({ user: newUser })
})

router.post('/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password

  if (isEmpty(username) || isEmpty(password)) {
    return res.status(400).json({ error: 'Please enter your username and password' })
  }

  const user = db.one(
    'SELECT id, username, email, is_admin, password_hash FROM users WHERE username = ?',
    [username]
  )

  if (!user) {
    return res.status(401).json({ error: 'Username or password is wrong' })
  }

  const passwordMatches = bcrypt.compareSync(password, user.password_hash)

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Username or password is wrong' })
  }

  req.session.userId = user.id

  res.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin
    }
  })
})

router.post('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(400).json({ error: 'Could not log you out, please try again' })
    }
    res.json({ ok: true })
  })
})

router.get('/me', function (req, res) {
  if (!req.session.userId) {
    return res.json({ user: null })
  }

  const user = findUserById(req.session.userId)

  if (!user) {
    return res.json({ user: null })
  }

  res.json({ user: user })
})

module.exports = router
