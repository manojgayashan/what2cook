import { initializeApp } from '@react-native-firebase/app'
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore'

export default async function getIngredients() {
  try {
    const db = getFirestore()
    const snapshot = await getDocs(collection(db, 'ingredients'))
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return items
  } catch (err) {
    console.warn('getIngredients error:', err)
    return []
  }
}
