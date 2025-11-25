// Datos de ejemplo y funciones que simulan llamadas asíncronas con Promises

const products = [
  { id: '1', title: 'Remera Classic', category: 'remeras', price: 1999, description: 'Remera de algodón, corte clásico.' },
  { id: '2', title: 'Remera Sport', category: 'remeras', price: 2499, description: 'Remera liviana para entrenamiento.' },
  { id: '3', title: 'Jean Slim', category: 'pantalones', price: 4999, description: 'Jean slim fit, color oscuro.' },
  { id: '4', title: 'Jogger', category: 'pantalones', price: 3999, description: 'Pantalón jogger cómodo y moderno.' },
  { id: '5', title: 'Gorra Retro', category: 'accesorios', price: 899, description: 'Gorra estilo retro, unisex.' },
  { id: '6', title: 'Llavero Logo', category: 'accesorios', price: 399, description: 'Llavero metálico con logo.' }
]

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function getProducts() {
  return delay(500).then(() => products)
}

export function getProductById(id) {
  return delay(400).then(() => products.find(p => p.id === id))
}

export default products
