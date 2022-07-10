import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB47aZg-l37qIAoghMq9TNHmyWCrKGTAhc',
  authDomain: 'modern-react-redux-1c77b.firebaseapp.com',
  projectId: 'modern-react-redux-1c77b',
  storageBucket: 'modern-react-redux-1c77b.appspot.com',
  messagingSenderId: '183263127207',
  appId: '1:183263127207:web:aa4ad93eaaeac486a01d82',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const firestoreDb = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objects) => {
  const collectionRef = collection(firestoreDb, collectionKey);
  const batch = writeBatch(firestoreDb);
  objects.forEach(obj => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });
  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(firestoreDb, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})

  return categoryMap;
}

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(firestoreDb, `users`, userAuth.uid);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating user document', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
