// The chat box holding all messages - Owner: SHALOM

import { useState } from 'react'
import ChatMessage from './ChatMessage'

const suggestions = [
  'Show blue abstract paintings',
  'Find nature oil paintings',
  'What can you do?'
]

function ChatWindow({ messages, onSend, waiting }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (text.trim() === '') return
    onSend(text)
    setText('')
  }

  return (
    <div className="chat-window">

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

