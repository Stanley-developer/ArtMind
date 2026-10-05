// Paintings the user saved - Owner: SHALOM

import { useState, useEffect } from 'react'
import PaintingGrid from '../components/PaintingGrid'
import { artworks } from '../data/artworks'


function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return fallback
    }
    return JSON.parse(raw)
  } catch (error) {
    return fallback
  }
}

function Favourites() {

  const [savedIds, setSavedIds] = useState([])

  useEffect(() => {
    const ids = readStore('artmind_favourites', [])
    setSavedIds(ids)
  }, [])

  const savedPaintings = artworks.filter((painting) => savedIds.includes(painting.id))

  function removeAll() {
    try {
      localStorage.removeItem('artmind_favourites')
    } catch (error) {
    }
    setSavedIds([])
  }

  function countText() {
    let word = 'paintings'
    if (savedPaintings.length === 1) {
      word = 'painting'
    }
    return savedPaintings.length + ' ' + word + ' saved'
  }

  return (
    <div className="container py-5">

      <p className="eyebrow">Your Collection</p>
      <h1 className="page-title">Favourites</h1>

      {savedPaintings.length > 0 ? (
        <div className="d-flex align-items-center mb-4">
          <p className="result-count mb-0">{countText()}</p>
          <button className="clear-link" onClick={removeAll}>Remove all</button>
        </div>
      ) : null}

      <PaintingGrid
        paintings={savedPaintings}
        emptyTitle="No favourites yet"
        emptySuggestion="Open any painting and press Save to favourites, and it will appear here."
      />

    </div>
  )
}

export default Favourites
