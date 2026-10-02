// Chat with the AI assistant (Feature 2) - Owner: SHALOM

import { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import { artworks, categories, mediums } from '../data/artworks'

const examples = [
  'Show me landscape paintings',
  'What can you do',
  'Popular paintings'
]

function splitIntoWords(lowered) {
  const cleaned = lowered.replace(/[^a-z0-9 ]/g, ' ')
  return cleaned.split(' ')
}

function isGreeting(words) {
  return words.includes('hello') || words.includes('hi') || words.includes('hey')
}

function findCategory(lowered) {
  for (let i = 0; i < categories.length; i++) {
    const name = categories[i].name
    if (lowered.includes(name.toLowerCase())) {
      return name
    }
  }
  return ''
}


function findMedium(lowered) {
  for (let i = 0; i < mediums.length; i++) {
    const name = mediums[i]
    if (lowered.includes(name.toLowerCase())) {
      return name
    }
  }
  return ''
}

function findArtist(words) {
  for (let i = 0; i < artworks.length; i++) {
    const nameParts = artworks[i].artist.toLowerCase().split(' ')
    for (let j = 0; j < nameParts.length; j++) {
      if (nameParts[j].length > 3 && words.includes(nameParts[j])) {
        return artworks[i].artist
      }
    }
  }
  return ''
}

function understand(text) {
  const lowered = text.toLowerCase()
  const words = splitIntoWords(lowered)

  if (isGreeting(words)) {
    return {
      text: 'Hello. Ask me for a category like Landscape, a medium like Oil, or an artist by name.',
      paintings: []
    }
  }

  if (lowered.includes('help') || lowered.includes('what can you do')) {
    return {
      text: 'I can do four things. Show every painting in a category such as Abstract or Nature. Show every painting done in a medium such as Oil or Charcoal. Show the work of one artist when you give me the name. And show the popular paintings when you ask for popular, trending or best.',
      paintings: []
    }
  }

  const category = findCategory(lowered)
  if (category !== '') {
    const found = artworks.filter((painting) => painting.category === category)
    if (found.length === 0) {
      return {
        text: 'I know that category, but I do not have any ' + category + ' paintings yet',
        paintings: []
      }
    }
    return {
      text: 'Here are the ' + category + ' paintings I have',
      paintings: found
    }
  }

  const medium = findMedium(lowered)
  if (medium !== '') {
    const found = artworks.filter((painting) => painting.medium === medium)
    if (found.length === 0) {
      return {
        text: 'Nothing in the collection is done in ' + medium + ' at the moment',
        paintings: []
      }
    }
    return {
      text: 'Here are the paintings done in ' + medium,
      paintings: found
    }
  }

  if (words.includes('popular') || words.includes('trending') || words.includes('best')) {
    return {
      text: 'These four are a good place to start',
      paintings: artworks.slice(0, 4)
    }
  }

  const artist = findArtist(words)
  if (artist !== '') {
    const found = artworks.filter((painting) => painting.artist === artist)
    return {
      text: 'Here is everything I have by ' + artist,
      paintings: found
    }
  }

  
  return {
    text: 'Sorry, I did not understand that one. Try asking me "Show me landscape paintings", or "Find oil paintings", or "What can you do".',
    paintings: []
  }
}

function Chatbot() {

  
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi, I am the ArtMind assistant. I can find paintings by category, by medium, or by artist, and I can show you the popular ones. Ask me anything about the collection.',
      paintings: []
    }
  ])

  const [waiting, setWaiting] = useState(false)

  function handleSend(text) {
    if (waiting) {
      return
    }

    const userMessage = { sender: 'user', text: text, paintings: [] }

    
    const withUser = messages.concat(userMessage)
    setMessages(withUser)
    setWaiting(true)

    const reply = understand(text)
    const botMessage = { sender: 'bot', text: reply.text, paintings: reply.paintings }

  
    setTimeout(() => {
      setMessages(withUser.concat(botMessage))
      setWaiting(false)
    }, 600)
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <p className="eyebrow">Ask ArtMind</p>
          <h1 className="page-title">Assistant</h1>
          <p className="band-lead mb-4">
            Ask a question about the collection and the assistant will pull out
            the paintings that match it.
          </p>

          <ChatWindow messages={messages} onSend={handleSend} waiting={waiting} />

          
          <div className="mt-4">
            <p className="small-heading">Try one of these</p>
            <div className="chat-suggestions">
              {examples.map((question) => (
                <button
                  key={question}
                  className="suggestion-chip"
                  onClick={() => handleSend(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Chatbot
