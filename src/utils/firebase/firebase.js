import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD4zeevelJblUkQ9uE983M3hrfUcm9mICw",
    authDomain: "crown-clothing-db-1e154.firebaseapp.com",
    projectId: "crown-clothing-db-1e154",
    storageBucket: "crown-clothing-db-1e154.appspot.com",
    messagingSenderId: "1036069394548",
    appId: "1:1036069394548:web:f75e06644a919c9f545921"
};
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = serverTimestamp();
        try {
            setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            })
        } catch (error) {
            console.log("Error creating user", error);
        }
    }
    return userDocRef;
}