// Friendly message when there is nothing to show - Owner: SHALOM

function EmptyState({ title, suggestion }) {
  return (
    <div className="empty-state">
      <h3 className="empty-state-title">{title || 'Nothing to show yet'}</h3>
      <p className="empty-state-text">
        {suggestion || 'Try a different filter or search.'}
      </p>
    </div>
  )
}

export default EmptyState