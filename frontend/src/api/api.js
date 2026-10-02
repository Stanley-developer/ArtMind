// Every call to the backend, in one place - Owner: SHALOM

import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

export function register(username, email, password) {
  return api.post('/auth/register', { username, email, password })
}

export function login(username, password) {
  return api.post('/auth/login', { username, password })
}

export function logout() {
  return api.post('/auth/logout')
}

export function getCurrentUser() {
  return api.get('/auth/me')
}


export function getPaintings(filters) {
  return api.get('/paintings', { params: filters })
}

export function getPainting(id) {
  return api.get('/paintings/' + id)
}

export function getSimilarPaintings(id) {
  return api.get('/paintings/' + id + '/similar')
}

export function recordView(id) {
  return api.post('/paintings/' + id + '/view')
}

export function getCategories() {
  return api.get('/paintings/categories')
}

export function getMediums() {
  return api.get('/paintings/mediums')
}


export function smartSearch(text) {
  return api.get('/search', { params: { q: text } })
}

export function sendChatMessage(message) {
  return api.post('/chatbot', { message })
}

export function recogniseImage(embedding) {
  return api.post('/recognise', { embedding })
}



export function getFavourites() {
  return api.get('/favourites')
}

export function addFavourite(id) {
  return api.post('/favourites/' + id)
}

export function removeFavourite(id) {
  return api.delete('/favourites/' + id)
}

export function getDashboard() {
  return api.get('/dashboard')
}



export function getTopPaintings() {
  return api.get('/analytics/top')
}

export function getViewsByCategory() {
  return api.get('/analytics/by-category')
}

export function getAnalyticsSummary() {
  return api.get('/analytics/summary')
}


export function pdfDownloadUrl(id) {
  return '/api/export/' + id + '/pdf'
}

export function wordDownloadUrl(id) {
  return '/api/export/' + id + '/docx'
}
