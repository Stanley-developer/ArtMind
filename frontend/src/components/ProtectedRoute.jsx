// Sends you to Login if you are not logged in - Owner: SHALOM

import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import LoadingSpinner from './LoadingSpinner'

function ProtectedRoute({ children }) {
  const { user, loading } = useUser()

  if (loading) {
    return <LoadingSpinner message="Checking your login..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
