// Bottom of every page - Owner: SHALOM

import { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  const year = new Date().getFullYear()

  const [email, setEmail] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (email.trim() === '') return
    setSignedUp(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="container">

        <div className="row g-5">

          <div className="col-lg-4">
            <p className="footer-brand">ArtMind</p>
            <p className="footer-about">
              An online painting gallery that uses AI to help you find the works
              you would never have thought to search for.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <p className="footer-heading">Browse</p>
            <Link to="/gallery" className="footer-link">Gallery</Link>
            <Link to="/gallery?category=Abstract" className="footer-link">Abstract</Link>
            <Link to="/gallery?category=Landscape" className="footer-link">Landscape</Link>
            <Link to="/gallery?category=Flower" className="footer-link">Flower</Link>
          </div>

          <div className="col-6 col-lg-2">
            <p className="footer-heading">Features</p>
            <Link to="/upload" className="footer-link">Identify a Painting</Link>
            <Link to="/chatbot" className="footer-link">Ask ArtMind</Link>
            <Link to="/dashboard" className="footer-link">Your Dashboard</Link>
            <Link to="/analytics" className="footer-link">Analytics</Link>
          </div>

          <div className="col-lg-4">
            <p className="footer-heading">Stay in touch</p>
            <p className="footer-about">
              New works added every week. We will let you know.
            </p>

            {signedUp ? (
              <p className="footer-thanks">Thank you. You are on the list.</p>
            ) : (
              <form className="newsletter-row" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control newsletter-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" className="btn btn-teal">Join</button>
              </form>
            )}
          </div>

        </div>

        <div className="footer-bottom">
          <p>ArtMind &copy; {year}</p>
          <p className="footer-credit">
            Paintings shown are in the public domain, courtesy of Wikimedia Commons.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
