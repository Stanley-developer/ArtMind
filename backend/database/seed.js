// Creates the database and adds sample paintings - Owner: STANLEY

const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const config = require('../config')
const db = require('./db')

const tagNames = [
  'blue',
  'warm',
  'calm',
  'bright',
  'dark',
  'portrait',
  'nature',
  'classic',
  'bold',
  'soft'
]

const paintingList = [
  {
    title: 'The Fighting Temeraire',
    artist: 'J. M. W. Turner',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1839,
    price: 88000,
    image_url: '/images/hero.jpg',
    description: 'An old warship is pulled across a glowing evening river for the last time.'
  },
  {
    title: 'Composition with Red, Blue and Yellow',
    artist: 'Piet Mondrian',
    category: 'Abstract',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1930,
    price: 74000,
    image_url: '/images/abstract.jpg',
    description: 'Straight black lines and three flat colours arranged into a simple balanced grid.'
  },
  {
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1818,
    price: 69000,
    image_url: '/images/landscape.jpg',
    description: 'A lone traveller stands on a rock and looks out over a valley filled with mist.'
  },
  {
    title: 'Sunflowers',
    artist: 'Vincent van Gogh',
    category: 'Flower',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1888,
    price: 92000,
    image_url: '/images/flower.jpg',
    description: 'A vase of bright yellow sunflowers painted with thick lively brush strokes.'
  },
  {
    title: 'Almond Blossoms',
    artist: 'Vincent van Gogh',
    category: 'Nature',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1890,
    price: 81000,
    image_url: '/images/nature.jpg',
    description: 'White almond flowers open on dark branches against a clear blue sky.'
  },
  {
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1665,
    price: 90000,
    image_url: '/images/figurative.jpg',
    description: 'A young girl turns her head towards the viewer and a single pearl catches the light.'
  },
  {
    title: 'Sistine Madonna',
    artist: 'Raphael',
    category: 'Religious',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1512,
    price: 85000,
    image_url: '/images/religious.jpg',
    description: 'Mary carries the child Jesus through parted curtains while two small angels watch below.'
  },
  {
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    category: 'Nature',
    medium: 'Digital',
    surface: 'Paper',
    year: 1831,
    price: 46000,
    image_url: '/images/feature-1.jpg',
    description: 'A huge curling wave rises over small fishing boats with Mount Fuji far behind.'
  },
  {
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1889,
    price: 95000,
    image_url: '/images/feature-2.jpg',
    description: 'Swirling blue sky and large yellow stars move above a quiet sleeping village.'
  },
  {
    title: 'Still Life with Apples and Oranges',
    artist: 'Paul Cezanne',
    category: 'Flower',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1899,
    price: 52000,
    image_url: '/images/feature-3.jpg',
    description: 'Fruit and a white cloth are piled on a table and seen from several angles at once.'
  },
  {
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1908,
    price: 93000,
    image_url: '/images/showcase-1.jpg',
    description: 'Two lovers kneel together wrapped in a golden patterned robe.'
  },
  {
    title: 'The Night Watch',
    artist: 'Rembrandt van Rijn',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1642,
    price: 87000,
    image_url: '/images/showcase-2.jpg',
    description: 'A city militia steps forward out of deep shadow into a warm beam of light.'
  },
  {
    title: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1886,
    price: 78000,
    image_url: '/images/showcase-3.jpg',
    description: 'City people relax by the river on a calm afternoon painted with thousands of small dots.'
  },
  {
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1872,
    price: 20000,
    image_url: '/images/showcase-4.jpg',
    description: 'Soft orange light spreads over a misty harbour as the sun comes up.'
  }
]

function createTables() {
  const schemaText = fs.readFileSync(config.schemaPath, 'utf8')
  db.db.exec(schemaText)
}

function clearOldData() {
  db.run('DELETE FROM painting_tags')
  db.run('DELETE FROM favourites')
  db.run('DELETE FROM view_history')
  db.run('DELETE FROM chat_logs')
  db.run('DELETE FROM uploads')
  db.run('DELETE FROM paintings')
  db.run('DELETE FROM tags')
  db.run('DELETE FROM categories')
  db.run('DELETE FROM mediums')
  db.run('DELETE FROM users')
  resetIdCounters()
}

function resetIdCounters() {
  try {
    db.run('DELETE FROM sqlite_sequence')
  } catch (error) {
    console.log('No id counters to reset yet')
  }
}

function insertCategories() {
  for (let i = 0; i < config.categories.length; i++) {
    const category = config.categories[i]
    db.run('INSERT INTO categories (name, description) VALUES (?, ?)', [
      category.name,
      category.description
    ])
  }
}

function insertMediums() {
  for (let i = 0; i < config.mediums.length; i++) {
    const mediumName = config.mediums[i]
    db.run('INSERT INTO mediums (name) VALUES (?)', [mediumName])
  }
}

function insertUsers() {
  const adminHash = bcrypt.hashSync('admin123', 10)
  const studentHash = bcrypt.hashSync('student123', 10)

  db.run(
    'INSERT INTO users (username, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
    ['admin', 'admin@artmind.com', adminHash, 1]
  )

  db.run(
    'INSERT INTO users (username, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
    ['student', 'student@artmind.com', studentHash, 0]
  )
}

function findCategoryId(categoryName) {
  const row = db.one('SELECT id FROM categories WHERE name = ?', [categoryName])
  if (!row) {
    return null
  }
  return row.id
}

function findMediumId(mediumName) {
  const row = db.one('SELECT id FROM mediums WHERE name = ?', [mediumName])
  if (!row) {
    return null
  }
  return row.id
}

function insertPaintings() {
  for (let i = 0; i < paintingList.length; i++) {
    const painting = paintingList[i]
    const categoryId = findCategoryId(painting.category)
    const mediumId = findMediumId(painting.medium)

    db.run(
      'INSERT INTO paintings (title, artist, description, image_url, category_id, medium_id, surface, year_created, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        painting.title,
        painting.artist,
        painting.description,
        painting.image_url,
        categoryId,
        mediumId,
        painting.surface,
        painting.year,
        painting.price
      ]
    )
  }
}

function insertTags() {
  for (let i = 0; i < tagNames.length; i++) {
    db.run('INSERT INTO tags (name) VALUES (?)', [tagNames[i]])
  }
}

function linkPaintingsToTags() {
  const paintings = db.all('SELECT id FROM paintings ORDER BY id')
  const tags = db.all('SELECT id FROM tags ORDER BY id')

  for (let i = 0; i < paintings.length; i++) {
    const paintingId = paintings[i].id
    const firstTag = tags[i % tags.length].id
    const secondTag = tags[(i + 3) % tags.length].id
    const thirdTag = tags[(i + 6) % tags.length].id

    addPaintingTag(paintingId, firstTag)
    addPaintingTag(paintingId, secondTag)
    addPaintingTag(paintingId, thirdTag)
  }
}

function addPaintingTag(paintingId, tagId) {
  db.run('INSERT OR IGNORE INTO painting_tags (painting_id, tag_id) VALUES (?, ?)', [
    paintingId,
    tagId
  ])
}

function setStartingViewCounts() {
  const paintings = db.all('SELECT id FROM paintings ORDER BY id')

  for (let i = 0; i < paintings.length; i++) {
    const paintingId = paintings[i].id
    const startingViews = 5 + paintingId * 7
    db.run('UPDATE paintings SET view_count = ? WHERE id = ?', [startingViews, paintingId])
  }
}

function printSummary() {
  const categoryCount = db.one('SELECT COUNT(*) AS total FROM categories')
  const mediumCount = db.one('SELECT COUNT(*) AS total FROM mediums')
  const userCount = db.one('SELECT COUNT(*) AS total FROM users')
  const paintingCount = db.one('SELECT COUNT(*) AS total FROM paintings')
  const tagCount = db.one('SELECT COUNT(*) AS total FROM tags')
  const paintingTagCount = db.one('SELECT COUNT(*) AS total FROM painting_tags')

  console.log('')
  console.log('ArtMind database seeded')
  console.log('Database file: ' + config.dbPath)
  console.log('')
  console.log('Categories:    ' + categoryCount.total)
  console.log('Mediums:       ' + mediumCount.total)
  console.log('Users:         ' + userCount.total)
  console.log('Paintings:     ' + paintingCount.total)
  console.log('Tags:          ' + tagCount.total)
  console.log('Painting tags: ' + paintingTagCount.total)
  console.log('')
  console.log('Demo logins')
  console.log('Admin:   admin@artmind.com / admin123')
  console.log('Student: student@artmind.com / student123')
  console.log('')
}

function seed() {
  createTables()
  clearOldData()
  insertCategories()
  insertMediums()
  insertUsers()
  insertPaintings()
  insertTags()
  linkPaintingsToTags()
  setStartingViewCounts()
  printSummary()
}

seed()
