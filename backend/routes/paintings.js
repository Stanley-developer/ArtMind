// Gallery list, one painting, categories, filters - Owner: STANLEY

const express = require('express')
const db = require('../database/db')
const config = require('../config')

const router = express.Router()

function baseSelect() {
  return 'SELECT p.id, p.title, p.artist, p.description, p.image_url, p.surface, ' +
    'p.year_created, p.price, p.ai_summary, p.style, p.view_count, ' +
    'p.dominant_colours, p.category_id, p.medium_id, ' +
    'c.name AS category, m.name AS medium ' +
    'FROM paintings p ' +
    'LEFT JOIN categories c ON c.id = p.category_id ' +
    'LEFT JOIN mediums m    ON m.id = p.medium_id'
}

function isEmpty(value) {
  if (value === undefined || value === null) {
    return true
  }
  if (String(value).trim() === '') {
    return true
  }
  return false
}

function readPageNumber(value) {
  const page = Number(value)

  if (!page || page < 1) {
    return 1
  }

  return Math.floor(page)
}

function findPaintingById(id) {
  return db.one(baseSelect() + ' WHERE p.id = ?', [id])
}

router.get('/categories', function (req, res) {
  const categories = db.all('SELECT id, name, description FROM categories ORDER BY id', [])
  res.json({ items: categories })
})

router.get('/mediums', function (req, res) {
  const mediums = db.all('SELECT id, name FROM mediums ORDER BY id', [])
  res.json({ items: mediums })
})

router.get('/', function (req, res) {
  const category = req.query.category
  const medium = req.query.medium
  const searchText = req.query.q

  const page = readPageNumber(req.query.page)
  const pageSize = config.pageSize
  const offset = (page - 1) * pageSize

  const conditions = []
  const params = []

  if (!isEmpty(category)) {
    conditions.push('c.name = ?')
    params.push(category)
  }

  if (!isEmpty(medium)) {
    conditions.push('m.name = ?')
    params.push(medium)
  }

  if (!isEmpty(searchText)) {
    conditions.push('(p.title LIKE ? OR p.artist LIKE ?)')
    params.push('%' + searchText + '%')
    params.push('%' + searchText + '%')
  }

  let whereClause = ''

  if (conditions.length > 0) {
    whereClause = ' WHERE ' + conditions.join(' AND ')
  }

  const countSql = 'SELECT COUNT(*) AS total FROM paintings p ' +
    'LEFT JOIN categories c ON c.id = p.category_id ' +
    'LEFT JOIN mediums m    ON m.id = p.medium_id' + whereClause

  const countRow = db.one(countSql, params)
  const total = countRow.total

  const pageSql = baseSelect() + whereClause + ' ORDER BY p.id LIMIT ? OFFSET ?'
  const pageParams = params.concat([pageSize, offset])

  const items = db.all(pageSql, pageParams)
  const pages = Math.ceil(total / pageSize)

  res.json({
    items: items,
    total: total,
    page: page,
    pages: pages
  })
})

router.get('/:id/similar', function (req, res) {
  const id = req.params.id
  const painting = findPaintingById(id)

  if (!painting) {
    return res.status(404).json({ error: 'Painting not found' })
  }

  let similar = []

  if (painting.category_id) {
    similar = db.all(
      baseSelect() + ' WHERE p.category_id = ? AND p.id != ? ORDER BY p.view_count DESC LIMIT 6',
      [painting.category_id, painting.id]
    )
  } else {
    similar = db.all(
      baseSelect() + ' WHERE p.id != ? ORDER BY p.view_count DESC LIMIT 6',
      [painting.id]
    )
  }

  res.json({ items: similar })
})

router.get('/:id', function (req, res) {
  const painting = findPaintingById(req.params.id)

  if (!painting) {
    return res.status(404).json({ error: 'Painting not found' })
  }

  res.json({ painting: painting })
})

router.post('/:id/view', function (req, res) {
  const id = req.params.id
  const painting = db.one('SELECT id FROM paintings WHERE id = ?', [id])

  if (!painting) {
    return res.status(404).json({ error: 'Painting not found' })
  }

  db.run('UPDATE paintings SET view_count = view_count + 1 WHERE id = ?', [painting.id])

  let userId = null

  if (req.session.userId) {
    userId = req.session.userId
  }

  db.run(
    'INSERT INTO view_history (user_id, painting_id) VALUES (?, ?)',
    [userId, painting.id]
  )

  const countRow = db.one('SELECT view_count FROM paintings WHERE id = ?', [painting.id])

  res.json({ ok: true, view_count: countRow.view_count })
})

module.exports = router
