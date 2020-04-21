import {firebase, firebaseAuth, firebaseDB} from './firebase'

export default class FirebaseService {

  static doCreateUserWithEmailAndPassword = async (email, password, params) => {
    try{
      const resp = await firebaseAuth.createUserWithEmailAndPassword(email, password)

      firebaseDB.collection('ongs')
      .doc(resp.user.uid)
      .set(params)

      localStorage.setItem('userName', params.name)

      return true;

    } catch(error) {
      console.log(error);      
      alert(error.message);
      return false;
    }
  }

  static doSignInWithEmailAndPassword = (email, password) =>
    firebaseAuth.signInWithEmailAndPassword(email, password)

  static doSignInWithPopup = () => {
  
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    firebaseAuth.useDeviceLanguage()

    return firebaseAuth.signInWithPopup(provider)
  }

  static doSignInWithGoogle = () => {
  
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    firebaseAuth.useDeviceLanguage()

    return firebaseAuth.signInWithRedirect(provider)
  }

  static doSignOut = () => firebaseAuth.signOut()

  static doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  static doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)

  // == CRUDs ==

  static getDataList = (doc, orderBy, size = 10) =>    
    firebaseDB.collection('incidents')
    .where('ongId', '==', doc)
    .limitToLast(size)
    .orderBy(orderBy, 'desc')

  static delData = (id) => 
    firebaseDB.collection('incidents')
    .doc(id)
    .delete()

  static postData = (params) => {
    firebaseDB.collection('incidents')
    .add(params)
  }

  static setData = (doc, params) => {
    firebaseDB.collection('incidents')
    .doc(doc)
    .add(params)
  }

  static getOngData = (id) => firebaseDB.collection('ongs')
  .doc(id).get()

}