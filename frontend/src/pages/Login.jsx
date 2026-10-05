// Login page - Owner: SHALOM

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

const demoAccounts = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'student', password: 'student123', role: 'user' }
]

function findMatchingUser(username, password) {

  for (let i = 0; i < demoAccounts.length; i = i + 1) {
    const account = demoAccounts[i]

    if (account.username === username && account.password === password) {
      return { username: account.username, role: account.role }
    }
  }
  const savedAccounts = readStore('artmind_accounts', [])

  for (let i = 0; i < savedAccounts.length; i = i + 1) {
    const account = savedAccounts[i]

    if (account.username === username && account.password === password) {
      return { username: account.username, role: 'user' }
    }
  }

  return null
}

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')
  const { setUser } = useUser()
  const navigate = useNavigate()

  function handleSubmit(event) {
  
    event.preventDefault()

    const matchedUser = findMatchingUser(username, password)

    if (matchedUser === null) {
      setErrorText('That username or password is not right. Please try again.')
      return
    }

    localStorage.setItem('artmind_user', JSON.stringify(matchedUser))

    setUser(matchedUser)
    navigate('/dashboard')
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">
        <div className="col-md-5">

          <p className="eyebrow">Welcome back</p>
          <h1 className="page-title">Log in</h1>

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
              <label className="form-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-teal">Log in</button>

          </form>

          <p className="band-lead mt-4">
            No account yet? <Link to="/register">Create one here</Link>
          </p>

          <div className="bg-light border p-3 mt-4">
            <h3 className="small-heading">Accounts you can try</h3>
            <p className="mb-1">admin / admin123 opens the admin pages</p>
            <p className="mb-0">student / student123 opens the normal pages</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
