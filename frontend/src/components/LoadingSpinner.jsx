// Spinning circle while waiting - Owner: SHALOM



function LoadingSpinner({ message }) {
  return (
    <div className="text-center py-5">
      <div className="spinner-border text-secondary" role="status"></div>
      <p className="loading-text">{message || 'Loading...'}</p>
    </div>
  )
}

export default LoadingSpinner
