import { initializeApp } from 'firebase/app'

import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    serverTimestamp,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD4zeevelJblUkQ9uE983M3hrfUcm9mICw",
    authDomain: "crown-clothing-db-1e154.firebaseapp.com",
    projectId: "crown-clothing-db-1e154",
    storageBucket: "crown-clothing-db-1e154.appspot.com",
    messagingSenderId: "1036069394548",
    appId: "1:1036069394548:web:f75e06644a919c9f545921"
};
  
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = collection(db, collectionKey);
//     const batch = writeBatch(db);
//     objectsToAdd.forEach(obj => {
//         const docRef = doc(collectionRef, obj.title.toLowerCase())
//         batch.set(docRef, obj);
//     })
//     await batch.commit();
// }

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q);
    // querySnapshot.docs.forEach(el => {
    //     console.log("querySnapshot.docs",el.data());
    // })

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
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
                ...additionalInfo
            })
        } catch (error) {
            console.log("Error creating user", error);
        }
    }
    return userDocRef;
}

export const signUp = async(email, password) => {
    if(!(email && password)){
        return;
    }
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signIn = async(email, password) => {
    if(!(email && password)){
        return;
    }
    return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
    return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}
