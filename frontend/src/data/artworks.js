// Sample paintings used until the backend is ready - Owner: SHALOM

export const artworks = [
  {
    id: 1,
    title: 'The Fighting Temeraire',
    artist: 'J. M. W. Turner',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1839,
    image: '/images/hero.jpg'
  },
  {
    id: 2,
    title: 'Composition with Red, Blue and Yellow',
    artist: 'Piet Mondrian',
    category: 'Abstract',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1930,
    image: '/images/abstract.jpg'
  },
  {
    id: 3,
    title: 'Wanderer above the Sea of Fog',
    artist: 'Caspar David Friedrich',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1818,
    image: '/images/landscape.jpg'
  },
  {
    id: 4,
    title: 'Sunflowers',
    artist: 'Vincent van Gogh',
    category: 'Flower',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1888,
    image: '/images/flower.jpg'
  },
  {
    id: 5,
    title: 'Almond Blossoms',
    artist: 'Vincent van Gogh',
    category: 'Nature',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1890,
    image: '/images/nature.jpg'
  },
  {
    id: 6,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1665,
    image: '/images/figurative.jpg'
  },
  {
    id: 7,
    title: 'Sistine Madonna',
    artist: 'Raphael',
    category: 'Religious',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1512,
    image: '/images/religious.jpg'
  },
  {
    id: 8,
    title: 'The Great Wave off Kanagawa',
    artist: 'Katsushika Hokusai',
    category: 'Nature',
    medium: 'Digital',
    surface: 'Paper',
    year: 1831,
    image: '/images/feature-1.jpg'
  },
  {
    id: 9,
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1889,
    image: '/images/feature-2.jpg'
  },
  {
    id: 10,
    title: 'Still Life with Apples and Oranges',
    artist: 'Paul Cezanne',
    category: 'Flower',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1899,
    image: '/images/feature-3.jpg'
  },
  {
    id: 11,
    title: 'The Kiss',
    artist: 'Gustav Klimt',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1908,
    image: '/images/showcase-1.jpg'
  },
  {
    id: 12,
    title: 'The Night Watch',
    artist: 'Rembrandt van Rijn',
    category: 'Figurative',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1642,
    image: '/images/showcase-2.jpg'
  },
  {
    id: 13,
    title: 'A Sunday on La Grande Jatte',
    artist: 'Georges Seurat',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1886,
    image: '/images/showcase-3.jpg'
  },
  {
    id: 14,
    title: 'Impression, Sunrise',
    artist: 'Claude Monet',
    category: 'Landscape',
    medium: 'Oil',
    surface: 'Canvas',
    year: 1872,
    image: '/images/showcase-4.jpg'
  }
]

export const categories = [
  { name: 'Abstract', image: '/images/abstract.jpg' },
  { name: 'Landscape', image: '/images/landscape.jpg' },
  { name: 'Flower', image: '/images/flower.jpg' },
  { name: 'Nature', image: '/images/nature.jpg' },
  { name: 'Figurative', image: '/images/figurative.jpg' },
  { name: 'Religious', image: '/images/religious.jpg' }
]

export const mediums = ['Oil', 'Watercolour', 'Acrylic', 'Canvas', 'Charcoal', 'Digital']

export function findByIds(ids) {
  return ids.map((id) => artworks.find((item) => item.id === id))
}
