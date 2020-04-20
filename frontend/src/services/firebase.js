import app from 'firebase'
import 'firebase/auth'
import config from "../configs/firebaseConfig";

export const firebaseIntl = app.initializeApp(config)
export const firebase = app
export const firebaseAuth = app.auth()
export const firebaseDB = app.firestore()