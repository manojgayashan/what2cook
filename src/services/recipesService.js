import { initializeApp } from '@react-native-firebase/app'
import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore'

export default async function getRecipes() {
  try {
    const db = getFirestore()
    const snapshot = await getDocs(collection(db, 'recipes'))
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return items
  } catch (err) {
    console.warn('getRecipes error:', err)
    return []
  }
}
