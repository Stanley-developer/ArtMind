// Shown when the address does not exist - Owner: SHALOM

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="page-title">We could not find that page</h1>
      <p className="empty-state-text">
        The address you opened does not match any page on ArtMind. It may have been
        typed wrongly, or the painting it pointed to is no longer here.
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/" className="btn btn-teal">
          Back to home
        </Link>
        <Link to="/gallery" className="btn btn-outline-plain">
          Browse the gallery
        </Link>
      </div>
    </div>
  )
}

export default NotFound
