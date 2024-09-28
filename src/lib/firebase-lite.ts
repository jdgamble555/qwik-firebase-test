// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

const importFirestoreLite = async () => await import('firebase/firestore/lite');
const importFirebaseApp = async () => await import('firebase/app');
const importFirebaseAuth = async () => await import('firebase/auth');


export const firebaseServer = async (request: Request) => {

    const authIdToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    const firebaseApp = await importFirebaseApp();

    console.log(authIdToken);

    const serverApp = firebaseApp.initializeServerApp(firebase_config, {
        authIdToken
    });

    const firebaseAuth = await importFirebaseAuth();

    const serverAuth = firebaseAuth.getAuth(serverApp);
    await serverAuth.authStateReady();

    const firestoreLite = await importFirestoreLite();
    const serverDB = firestoreLite.getFirestore(serverApp);

    return {
        serverAuth,
        serverDB
    };
};