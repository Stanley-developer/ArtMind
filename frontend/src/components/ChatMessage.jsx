// One single chat bubble - Owner: SHALOM

import PaintingCard from './PaintingCard'

function ChatMessage({ sender, text, paintings }) {
  const isUser = sender === 'user'

  return (
    <div className={`chat-row ${isUser ? 'chat-row-user' : ''}`}>

      {!isUser && (
  <div className="chat-avatar">
    ✦
  </div>
)}

      <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : ''}`}>

        <p className="chat-text">{text}</p>

        {paintings && paintings.length > 0 ? (
          <div className="row g-2 mt-3">
            {paintings.map((painting) => (
              <div className="col-12 col-sm-6 col-md-4" key={painting.id}>
                <PaintingCard
                  id={painting.id}
                  title={painting.title}
                  artist={painting.artist}
                  image={painting.image_url || painting.image}
                />
              </div>
            ))}
          </div>
        ) : null}

      </div>

    </div>
  )
}

export default ChatMessage