// Recently viewed and suggestions (Feature 7) - Owner: SHALOM

import { useState, useEffect } from 'react'
import PaintingGrid from '../components/PaintingGrid'
import { useUser } from '../context/UserContext'
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

function findPainting(id) {
  for (let i = 0; i < artworks.length; i = i + 1) {
    if (artworks[i].id === id) {
      return artworks[i]
    }
  }
  return null
}

function Dashboard() {

  const [viewedIds, setViewedIds] = useState([])
  const [savedIds, setSavedIds] = useState([])

  
  const { user } = useUser()

  useEffect(() => {
    setViewedIds(readStore('artmind_views', []))
    setSavedIds(readStore('artmind_favourites', []))
  }, [])

  let displayName = 'there'
  if (user && user.username) {
    displayName = user.username
  }

  function recentlyViewed() {
    const found = []
    for (let i = 0; i < viewedIds.length; i = i + 1) {
      const painting = findPainting(viewedIds[i])
      if (painting !== null) {
        found.push(painting)
      }
    }
    return found.slice(0, 4)
  }

  function countCategories() {
    const counts = {}
    for (let i = 0; i < savedIds.length; i = i + 1) {
      const painting = findPainting(savedIds[i])
      if (painting !== null) {
        if (counts[painting.category] === undefined) {
          counts[painting.category] = 0
        }
        counts[painting.category] = counts[painting.category] + 1
      }
    }
    return counts
  }

  function countTotal(counts, names) {
    let total = 0
    for (let i = 0; i < names.length; i = i + 1) {
      total = total + counts[names[i]]
    }
    return total
  }
  function sharePercent(count, total) {
    if (total === 0) {
      return 0
    }
    return Math.round((count / total) * 100)
  }

  function favouriteCategory(counts, names) {
    let bestName = ''
    let bestCount = 0
    for (let i = 0; i < names.length; i = i + 1) {
      if (counts[names[i]] > bestCount) {
        bestName = names[i]
        bestCount = counts[names[i]]
      }
    }
    return bestName
  }

  
  function paintingsToSuggest(categoryName) {
    const list = []
    for (let i = 0; i < artworks.length; i = i + 1) {
      const painting = artworks[i]
      if (painting.category === categoryName && savedIds.includes(painting.id) === false) {
        list.push(painting)
      }
    }
    return list.slice(0, 4)
  }

  const recent = recentlyViewed()
  const counts = countCategories()
  const categoryNames = Object.keys(counts)
  const savedTotal = countTotal(counts, categoryNames)

  let suggestionTitle = 'Popular in the collection'
  let suggested = artworks.slice(0, 4)

  if (categoryNames.length > 0) {
    const bestCategory = favouriteCategory(counts, categoryNames)
    suggestionTitle = 'You might like'
    suggested = paintingsToSuggest(bestCategory)
  }

  return (
    <div className="container py-5">

      <p className="eyebrow">Your Space</p>
      <h1 className="page-title">Welcome back, {displayName}</h1>

      <h2 className="section-title mb-4">Recently viewed</h2>
      <div className="mb-5">
        <PaintingGrid
          paintings={recent}
          emptyTitle="Nothing viewed yet"
          emptySuggestion="Open a painting from the gallery and it will show up here so you can find it again."
        />
      </div>

     
      <h2 className="section-title mb-4">Your favourite categories</h2>
      <div className="mb-5">
        {categoryNames.length === 0 ? (
          <p className="empty-state-text">
            Save a few paintings and this will show which kinds of art you lean towards.
          </p>
        ) : (
          categoryNames.map((name) => (
            <div className="mb-3" key={name}>
              <div className="d-flex justify-content-between">
                <span className="small-heading">{name}</span>
                <span className="small-heading">{sharePercent(counts[name], savedTotal)}%</span>
              </div>
              
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  style={{
                    width: sharePercent(counts[name], savedTotal) + '%',
                    backgroundColor: 'var(--teal)'
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>

     
      <h2 className="section-title mb-4">{suggestionTitle}</h2>
      <PaintingGrid
        paintings={suggested}
        emptyTitle="No new suggestions right now"
        emptySuggestion="You have saved everything we have in that category, so try browsing another one."
      />

    </div>
  )
}

export default Dashboard
