import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from "../configs/firebaseConfig";

export const firebaseIntl = app.initializeApp(config)
export const firebase = app
export const firebaseAuth = app.auth()
export const firebaseDB = app.firestore()