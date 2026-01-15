const remeras = [
  'https://picsum.photos/seed/remera1/800/600',
  'https://picsum.photos/seed/remera2/800/600'
]

const pantalones = [
  'https://picsum.photos/seed/pantalon1/800/600',
  'https://picsum.photos/seed/pantalon2/800/600'
]

const gorra = ['https://picsum.photos/seed/gorra1/800/600']
const llavero = ['https://picsum.photos/seed/llavero1/800/600']

function hashString(s) {
  let h = 0
  if (!s) return 0
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export function productImageUrl(product = {}, width = 600, height = 400) {
  const raw = product.raw || {}
  const candidates = [raw.image, raw.img, raw.url, raw.foto, raw.imagen].filter(Boolean)
  if (candidates.length) return candidates[0]

  const id = String(product.id || product._id || (product.title || '')).toLowerCase()
  const key = (product.category || product.Categoria || product.categoria || '').toLowerCase()
  const h = hashString(id || product.title || key)

  let url = `https://picsum.photos/seed/default/800/600`
  if (key.includes('remera') || key.includes('remeras') || /remera/i.test(product.title || '')) {
    url = remeras[h % remeras.length]
  } else if (key.includes('pantalon') || key.includes('pantalones') || /pantalon|jean|jogger/i.test(product.title || '')) {
    url = pantalones[h % pantalones.length]
  } else if (key.includes('accesorio') || key.includes('accesorios')) {
    if (/gorra|cap/i.test(product.title || '')) url = gorra[0]
    else if (/llavero|llave/i.test(product.title || '')) url = llavero[0]
    else url = (h % 2 === 0) ? gorra[0] : llavero[0]
  } else {
    const pool = [...remeras, ...pantalones]
    url = pool[h % pool.length]
  }
  return url.replace('/800/600', `/${width}/${height}`)
}

export default productImageUrl
