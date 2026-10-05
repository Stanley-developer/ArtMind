// Create account page - Owner: SHALOM

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return fallback
    }
    return JSON.parse(raw)
  } catch (error) {
    return fallback
  }
}
const reservedNames = ['admin', 'student']

function isNameTaken(username) {

  for (let i = 0; i < reservedNames.length; i = i + 1) {
    if (reservedNames[i] === username) {
      return true
    }
  }

  const savedAccounts = readStore('artmind_accounts', [])

  for (let i = 0; i < savedAccounts.length; i = i + 1) {
    if (savedAccounts[i].username === username) {
      return true
    }
  }

  return false
}
function findProblem(username, email, password, confirmPassword) {

  if (username === '' || email === '' || password === '' || confirmPassword === '') {
    return 'Please fill in every box.'
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters.'
  }
  if (email.indexOf('@') === -1) {
    return 'That email address does not look right.'
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters.'
  }

  if (password !== confirmPassword) {
    return 'The two passwords are not the same.'
  }

  if (isNameTaken(username) === true) {
    return 'That username is already taken.'
  }
  return ''
}

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const { setUser } = useUser()
  const navigate = useNavigate()

  function handleSubmit(event) {
  
    event.preventDefault()

    const problem = findProblem(username, email, password, confirmPassword)

    if (problem !== '') {
      setErrorText(problem)
      return
    }

    const savedAccounts = readStore('artmind_accounts', [])
    savedAccounts.push({ username: username, email: email, password: password })

    localStorage.setItem('artmind_accounts', JSON.stringify(savedAccounts))
    const newUser = { username: username, role: 'user' }
    localStorage.setItem('artmind_user', JSON.stringify(newUser))

    setUser(newUser)
    navigate('/dashboard')
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">
        <div className="col-md-5">

          <p className="eyebrow">Join ArtMind</p>
          <h1 className="page-title">Create account</h1>

          {errorText !== '' ? (
            <div className="alert alert-danger">{errorText}</div>
          ) : null}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-teal">Create account</button>

          </form>

          <p className="band-lead mt-4">
            Already have an account? <Link to="/login">Log in here</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Register
