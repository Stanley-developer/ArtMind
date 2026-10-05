// Save and remove favourites (Feature 6) - Owner: STANLEY

const express = require('express')
const db = require('../database/db')

const router = express.Router()

function requireLogin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Please log in first' })
  }
  next()
}

router.use(requireLogin)

function getFavourites(req, res) {
  const userId = req.session.userId

  const sql = `
    SELECT p.id, p.title, p.artist, p.image_url, c.name AS category,
           m.name AS medium, f.created_at
    FROM favourites f
    JOIN paintings p ON p.id = f.painting_id
    LEFT JOIN categories c ON c.id = p.category_id
    LEFT JOIN mediums m ON m.id = p.medium_id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `

  const savedPaintings = db.all(sql, [userId])

  res.json({ items: savedPaintings })
}

function addFavourite(req, res) {
  const userId = req.session.userId
  const paintingId = Number(req.params.id)

  const painting = db.one('SELECT id FROM paintings WHERE id = ?', [paintingId])

  if (!painting) {
    return res.status(404).json({ error: 'Painting not found' })
  }

  const sql = 'INSERT OR IGNORE INTO favourites (user_id, painting_id) VALUES (?, ?)'
  db.run(sql, [userId, paintingId])

  res.json({ ok: true })
}

function removeFavourite(req, res) {
  const userId = req.session.userId
  const paintingId = Number(req.params.id)

  const sql = 'DELETE FROM favourites WHERE user_id = ? AND painting_id = ?'
  db.run(sql, [userId, paintingId])

  res.json({ ok: true })
}

router.get('/', getFavourites)
router.post('/:id', addFavourite)
router.delete('/:id', removeFavourite)

module.exports = router
