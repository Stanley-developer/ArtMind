// One single chat bubble - Owner: SHALOM

import PaintingCard from './PaintingCard'

function ChatMessage({ sender, text, paintings }) {
  const isUser = sender === 'user'

  return (
    <div className={isUser ? 'chat-row chat-row-user' : 'chat-row'}>
      <div className={isUser ? 'chat-bubble chat-bubble-user' : 'chat-bubble'}>

        <p className="chat-text">{text}</p>

        {paintings && paintings.length > 0 ? (
          <div className="row g-2 mt-3">
            {paintings.map((painting) => (
              <div className="col-4" key={painting.id}>
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