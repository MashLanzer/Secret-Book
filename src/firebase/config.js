import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDX6sWEucwkrsYco-c6ubxVXoYH5Y5Liow",
  authDomain: "secretbook-5b1ff.firebaseapp.com",
  projectId: "secretbook-5b1ff",
  storageBucket: "secretbook-5b1ff.firebasestorage.app",
  messagingSenderId: "1030121105757",
  appId: "1:1030121105757:web:b07c2bf8276e58ee9ce0b4",
  measurementId: "G-CZVSYJSRNT",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({ prompt: 'select_account' })
