// Most viewed paintings (Feature 9) - Owner: STANLEY

const express = require('express')
const db = require('../database/db')

const router = express.Router()

function getTopPaintings(req, res) {
  const sql = 'SELECT p.id, p.title, p.artist, p.image_url, p.view_count, c.name AS category FROM paintings p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.view_count DESC LIMIT 10'
  const topPaintings = db.all(sql, [])
  res.json({ items: topPaintings })
}

function getViewsByCategory(req, res) {
  const sql = 'SELECT c.name AS category, COUNT(p.id) AS paintings, COALESCE(SUM(p.view_count), 0) AS views FROM categories c LEFT JOIN paintings p ON p.category_id = c.id GROUP BY c.name ORDER BY views DESC'
  const categoryRows = db.all(sql, [])
  res.json({ items: categoryRows })
}

function getSummary(req, res) {
  const paintingRow = db.one('SELECT COUNT(*) AS total FROM paintings', [])
  const viewRow = db.one('SELECT COALESCE(SUM(view_count), 0) AS total FROM paintings', [])
  const userRow = db.one('SELECT COUNT(*) AS total FROM users', [])
  const favouriteRow = db.one('SELECT COUNT(*) AS total FROM favourites', [])

  res.json({
    totalPaintings: paintingRow.total,
    totalViews: viewRow.total,
    totalUsers: userRow.total,
    totalFavourites: favouriteRow.total
  })
}

router.get('/top', getTopPaintings)
router.get('/by-category', getViewsByCategory)
router.get('/summary', getSummary)

module.exports = router
