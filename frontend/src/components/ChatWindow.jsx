// The chat box holding all messages - Owner: SHALOM

import { useState } from 'react'
import ChatMessage from './ChatMessage'

const suggestions = [
  'Show me popular paintings',
  'Find abstract paintings',
  'Show paintings by an artist',
  'What oil paintings are available?'
]

function ChatWindow({ messages, onSend, waiting }) {
  const [text, setText] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() === '') return
    onSend(text)
    setText('')
  }

  return (
    <div className="chat-window">

  <div className="chat-header">

    <div>
      <p className="chat-header-label">ARTMIND AI</p>
      <h2 className="chat-header-title">Assistant</h2>
    </div>
<div className="chat-menu-wrapper">

  <button
    type="button"
    className="chat-menu-button"
    aria-label="Chat options"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    ⋯
  </button>

  {menuOpen && (
    <div className="chat-menu">

      <button
        type="button"
        onClick={() => {
          setMenuOpen(false)
          window.location.reload()
        }}
      >
        New conversation
      </button>

      <button
        type="button"
        onClick={() => {
          setMenuOpen(false)
          window.location.reload()
        }}
      >
        Clear chat
      </button>

      <button
        type="button"
        onClick={() => setMenuOpen(false)}
      >
        About ArtMind
      </button>

    </div>
  )}

</div>

  </div>

  <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.text}
            paintings={message.paintings}
          />
        ))}

        {waiting ? <p className="chat-waiting">ArtMind is thinking...</p> : null}
      </div>

      <div className="chat-suggestions">
        {suggestions.map((question) => (
          <button
            key={question}
            className="suggestion-chip"
            onClick={() => onSend(question)}
          >
            {question}
          </button>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control chat-input"
          placeholder="Ask me about any painting"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit" className="btn btn-teal">Send</button>
      </form>

    </div>
  )
}

export default ChatWindow

