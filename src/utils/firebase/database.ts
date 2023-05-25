import { collection } from 'firebase/firestore'
import { db } from './firebase'

/**
 * Reference to the cities collection
 */
export const citiesCollectionRef = collection(db, 'cities')
