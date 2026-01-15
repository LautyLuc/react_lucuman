import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp, query, where, runTransaction } from 'firebase/firestore'
import { app } from '../firebaseConfig'

const db = getFirestore(app)

function mapDocToProduct(d) {
  const data = d.data()
  return {
    id: d.id,
    title: data.Nombre || data.nombre || data.title || '',
    category: data.Categoria || data.categoria || data.category || '',
    price: Number(data.Precio ?? data.precio ?? data.price ?? 0),
    description: data.desc || data.descripcion || data.description || '',
    stock: Number(data.cant ?? data.stock ?? 0),
    raw: data
  }
}

export async function getProductsFirestore(category) {
  const col = collection(db, 'items')
  let q = col
  if (category) {
    q = query(col, where('Categoria', '==', category))
  }
  const snap = await getDocs(q)
  return snap.docs.map(mapDocToProduct)
}

export async function getProductByIdFirestore(id) {
  const ref = doc(db, 'items', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return mapDocToProduct(snap)
}

export async function createOrderFirestore(order) {
  const ordersCol = collection(db, 'orders')
  return await runTransaction(db, async (transaction) => {
    // PASO 1: Leer todos los datos primero
    const productsData = {}
    for (const it of order.items) {
      const prodRef = doc(db, 'items', it.id)
      const prodSnap = await transaction.get(prodRef)
      if (!prodSnap.exists()) throw new Error(`Producto no existe: ${it.id}`)
      const data = prodSnap.data()
      const current = Number(data.cant ?? data.stock ?? 0)
      if (current < it.qty) throw new Error(`Stock insuficiente para ${it.title}`)
      productsData[it.id] = { ref: prodRef, current }
    }
    
    const statsRef = doc(db, 'stats', 'compras')
    const statsSnap = await transaction.get(statsRef)
    const currentCount = statsSnap.exists() ? Number(statsSnap.data().total ?? 0) : 0
    
    // PASO 2: Escribir todos los datos después
    for (const it of order.items) {
      const newCant = productsData[it.id].current - it.qty
      const updates = { cant: newCant, Disponible: newCant > 0, available: newCant > 0 }
      transaction.update(productsData[it.id].ref, updates)
    }
    
    transaction.set(statsRef, { total: currentCount + 1, lastUpdated: serverTimestamp() }, { merge: true })
    
    const payload = { ...order, createdAt: serverTimestamp() }
    const orderRef = doc(ordersCol)
    transaction.set(orderRef, payload)
    return orderRef.id
  })
}

export async function updateProductStock(productId, newQuantity, isDelta = false) {
  const ref = doc(db, 'items', productId)
  await runTransaction(db, async (transaction) => {
    const snap = await transaction.get(ref)
    if (!snap.exists()) throw new Error('Producto no existe')
    const data = snap.data()
    const current = Number(data.cant ?? data.stock ?? 0)
    const updated = isDelta ? current + Number(newQuantity) : Number(newQuantity)
    if (updated < 0) throw new Error('Resultado de stock inválido')
    const updates = { cant: updated, Disponible: updated > 0, available: updated > 0 }
    transaction.update(ref, updates)
  })
  return true
}

// Aliases for backward compatibility
export async function restockProduct(productId, newQuantity) {
  return updateProductStock(productId, newQuantity, false)
}

export async function adjustProductStock(productId, delta) {
  return updateProductStock(productId, delta, true)
}

// Contador de compras
export async function getOrderCount() {
  try {
    const statsRef = doc(db, 'stats', 'compras')
    const snap = await getDoc(statsRef)
    if (!snap.exists()) return 0
    return Number(snap.data().total ?? 0)
  } catch (e) {
    console.error('Error obteniendo contador de compras:', e)
    return 0
  }
}

export async function resetOrderCount() {
  try {
    const statsRef = doc(db, 'stats', 'compras')
    await runTransaction(db, async (transaction) => {
      transaction.set(statsRef, { total: 0, lastReset: serverTimestamp() }, { merge: true })
    })
    return true
  } catch (e) {
    console.error('Error reseteando contador de compras:', e)
    return false
  }
}
