import { firebaseDB } from './firebase'

export default class FirebaseService {
  static getIncidents = (orderBy, size = 5) => firebaseDB.collection('incidents')
    .limitToLast(size)
    .orderBy(orderBy, 'desc')

  static getOngData = (id) => firebaseDB.collection('ongs')
    .doc(id).get()
}