// User dashboard data (Feature 7) - Owner: STANLEY

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

function getRecentPaintings(userId) {
  const sql = `
    SELECT p.id, p.title, p.artist, p.image_url, c.name AS category,
           MAX(v.viewed_at) AS last_viewed
    FROM view_history v
    JOIN paintings p ON p.id = v.painting_id
    LEFT JOIN categories c ON c.id = p.category_id
    WHERE v.user_id = ?
    GROUP BY p.id
    ORDER BY last_viewed DESC
    LIMIT 6
  `
  return db.all(sql, [userId])
}

function getTopCategories(userId) {
  const sql = `
    SELECT c.name AS category, COUNT(*) AS count
    FROM favourites f
    JOIN paintings p ON p.id = f.painting_id
    JOIN categories c ON c.id = p.category_id
    WHERE f.user_id = ?
    GROUP BY c.name
    ORDER BY count DESC
  `
  return db.all(sql, [userId])
}

function getMostViewedPaintings() {
  const sql = `
    SELECT p.id, p.title, p.artist, p.image_url, c.name AS category, p.view_count
    FROM paintings p
    LEFT JOIN categories c ON c.id = p.category_id
    ORDER BY p.view_count DESC
    LIMIT 4
  `
  return db.all(sql, [])
}

function getSuggestions(userId, topCategories) {
  if (topCategories.length === 0) {
    return getMostViewedPaintings()
  }

  const favouriteCategory = topCategories[0].category

  const sql = `
    SELECT p.id, p.title, p.artist, p.image_url, c.name AS category
    FROM paintings p
    JOIN categories c ON c.id = p.category_id
    WHERE c.name = ?
      AND p.id NOT IN (SELECT painting_id FROM favourites WHERE user_id = ?)
    ORDER BY p.view_count DESC
    LIMIT 4
  `
  return db.all(sql, [favouriteCategory, userId])
}

router.get('/', function (req, res) {
  const userId = req.session.userId
  const recent = getRecentPaintings(userId)
  const topCategories = getTopCategories(userId)
  const suggestions = getSuggestions(userId, topCategories)
  res.json({ recent: recent, topCategories: topCategories, suggestions: suggestions })
})

module.exports = router
