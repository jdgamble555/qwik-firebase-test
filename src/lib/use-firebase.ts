// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);


// dynamic importing
const importFirebaseApp = async () => {
    const firebaseApp = await import('firebase/app');

    if (firebaseApp.getApps()?.length) {
        return firebaseApp.getApp();
    }
    return firebaseApp.initializeApp(firebase_config);
};
const importFirebaseAuth = async () => await import('firebase/auth');
const importFirestore = async () => await import('firebase/firestore');


export const getFirebase = async () => {

    const app = await importFirebaseApp();
    const firestore = await importFirestore();
    const firebaseAuth = await importFirebaseAuth();

    const db = firestore.getFirestore(app);
    const auth = firebaseAuth.getAuth(app);

    return {
        app,
        db,
        auth
    };
};


export const logout = async () => {
    const firebaseAuth = await importFirebaseAuth();
    const { auth } = await getFirebase();
    await firebaseAuth.signOut(auth);
};


export const login = async () => {
    const firebaseAuth = await importFirebaseAuth();
    const { auth } = await getFirebase();
    await firebaseAuth.signInWithPopup(
        auth,
        new firebaseAuth.GoogleAuthProvider()
    );
};

export const getUser = async () => {
    const firebaseAuth = await importFirebaseAuth();
    const { auth } = await getFirebase();
    return {
        auth,
        onAuthChange: firebaseAuth.onIdTokenChanged
    };
};

