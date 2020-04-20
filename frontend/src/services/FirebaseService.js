import {firebase, firebaseAuth, firebaseDB} from './firebase'

export default class FirebaseService {

  static doCreateUserWithEmailAndPassword = async (email, password, params) => {
    try{
      const resp = await firebaseAuth.createUserWithEmailAndPassword(email, password)      
      firebaseDB.collection('ongs')
      .doc(resp.user.uid)
      .set(params)

      // this.setData(resp.user.uid, params)
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
    firebaseDB.collection('ongs')
    .doc(doc)
    .collection("incidents")
    .limitToLast(size)
    .orderBy(orderBy)

  static delData = (doc, id) => 
    firebaseDB.collection('ongs')
    .doc(doc)
    .collection("incidents")
    .doc(id)
    .delete()

  static postData = (doc, params) => {
    firebaseDB.collection('ongs')
    .doc(doc)
    .collection("incidents")
    .add(params)
  }

  static setData = (doc, params) => {
    firebaseDB.collection('ongs')
    .doc(doc)
    .add(params)
  }

}