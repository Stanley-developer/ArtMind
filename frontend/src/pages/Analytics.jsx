// Most viewed paintings (Feature 9) - Owner: SHALOM

import { useState, useEffect } from 'react'
import EmptyState from '../components/EmptyState'
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

function Analytics() {

  
  const [viewedIds, setViewedIds] = useState([])

  useEffect(() => {
    setViewedIds(readStore('artmind_views', []))
  }, [])

  function countByPainting() {
    const counts = {}
    for (let i = 0; i < viewedIds.length; i = i + 1) {
      const painting = findPainting(viewedIds[i])
      if (painting !== null) {
        if (counts[painting.id] === undefined) {
          counts[painting.id] = 0
        }
        counts[painting.id] = counts[painting.id] + 1
      }
    }
    return counts
  }

  function countByCategory() {
    const counts = {}
    for (let i = 0; i < viewedIds.length; i = i + 1) {
      const painting = findPainting(viewedIds[i])
      if (painting !== null) {
        if (counts[painting.category] === undefined) {
          counts[painting.category] = 0
        }
        counts[painting.category] = counts[painting.category] + 1
      }
    }
    return counts
  }


  function paintingRows(counts) {
    const rows = []
    const ids = Object.keys(counts)
    for (let i = 0; i < ids.length; i = i + 1) {
      const painting = findPainting(Number(ids[i]))
      if (painting !== null) {
        rows.push({ label: painting.title, count: counts[ids[i]] })
      }
    }
    return rows
  }

 
  function categoryRows(counts) {
    const rows = []
    const names = Object.keys(counts)
    for (let i = 0; i < names.length; i = i + 1) {
      rows.push({ label: names[i], count: counts[names[i]] })
    }
    return rows
  }

  
  function sortBiggestFirst(rows) {
    return rows.sort((first, second) => second.count - first.count)
  }

  
  function highestCount(rows) {
    let highest = 0
    for (let i = 0; i < rows.length; i = i + 1) {
      if (rows[i].count > highest) {
        highest = rows[i].count
      }
    }
    return highest
  }

  function barWidth(count, highest) {
    if (highest === 0) {
      return 0
    }
    return Math.round((count / highest) * 100)
  }


  function totalOf(rows) {
    let total = 0
    for (let i = 0; i < rows.length; i = i + 1) {
      total = total + rows[i].count
    }
    return total
  }

  function drawBar(row, highest) {
    return (
      <div className="d-flex align-items-center mb-3" key={row.label}>
        <div style={{ width: '200px', paddingRight: '12px' }}>{row.label}</div>
        <div
          className="flex-grow-1"
          style={{ height: '14px', backgroundColor: 'var(--line)', borderRadius: '7px' }}
        >
          <div
            style={{
              width: barWidth(row.count, highest) + '%',
              height: '14px',
              backgroundColor: 'var(--teal)',
              borderRadius: '7px'
            }}
          ></div>
        </div>
        <div className="ms-3" style={{ width: '36px', textAlign: 'right' }}>{row.count}</div>
      </div>
    )
  }

 
  const paintingCounts = countByPainting()
  const categoryCounts = countByCategory()

  const allPaintingRows = sortBiggestFirst(paintingRows(paintingCounts))
  const allCategoryRows = sortBiggestFirst(categoryRows(categoryCounts))

  const topPaintings = allPaintingRows.slice(0, 5)

  const totalViews = totalOf(allPaintingRows)
  const differentPaintings = allPaintingRows.length
  const differentCategories = allCategoryRows.length

  const paintingHighest = highestCount(topPaintings)
  const categoryHighest = highestCount(allCategoryRows)

  if (totalViews === 0) {
    return (
      <div className="container py-5">
        <p className="eyebrow">Your Activity</p>
        <h1 className="page-title">Analytics</h1>
        <EmptyState
          title="No activity yet"
          suggestion="Browse the gallery and open a few paintings first, then come back here to see what you looked at most."
        />
      </div>
    )
  }

  return (
    <div className="container py-5">

      <p className="eyebrow">Your Activity</p>
      <h1 className="page-title">Analytics</h1>

      <p className="result-count">
        These figures come from this browser only. When the server is ready
        they will be the real numbers for everybody using ArtMind.
      </p>

      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="eyebrow">Total views</p>
              <h2 className="section-title">{totalViews}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="eyebrow">Paintings opened</p>
              <h2 className="section-title">{differentPaintings}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="eyebrow">Categories touched</p>
              <h2 className="section-title">{differentCategories}</h2>
            </div>
          </div>
        </div>
      </div>

    
      <h2 className="section-title mb-4">Most viewed paintings</h2>
      <div className="mb-5">
        {topPaintings.map((row) => drawBar(row, paintingHighest))}
      </div>

      
      <h2 className="section-title mb-4">Views by category</h2>
      <div className="mb-5">
        {allCategoryRows.map((row) => drawBar(row, categoryHighest))}
      </div>

    </div>
  )
}

export default Analytics
