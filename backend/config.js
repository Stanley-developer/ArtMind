// All settings in one place (port, db path, categories) - Owner: STANLEY

const path = require('path')

const port = 5000

const frontendUrl = 'http://localhost:5173'

const sessionSecret = 'artmind-eproject-secret-key'

const dbPath = path.join(__dirname, 'database', 'artmind.db')

const schemaPath = path.join(__dirname, 'database', 'schema.sql')

const uploadsDir = path.join(__dirname, 'uploads')

const categories = [
  { name: 'Abstract', description: 'Shapes and colours instead of real objects' },
  { name: 'Landscape', description: 'Scenery, land, sea and sky' },
  { name: 'Flower', description: 'Flowers and plants' },
  { name: 'Nature', description: 'Trees, animals and the natural world' },
  { name: 'Figurative', description: 'People and portraits' },
  { name: 'Religious', description: 'Religious scenes and figures' }
]

const mediums = ['Oil', 'Watercolour', 'Acrylic', 'Canvas', 'Charcoal', 'Digital']

const pageSize = 12

module.exports = {
  port,
  frontendUrl,
  sessionSecret,
  dbPath,
  schemaPath,
  uploadsDir,
  categories,
  mediums,
  pageSize
}
