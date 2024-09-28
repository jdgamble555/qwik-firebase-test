import { isBrowser } from '@builder.io/qwik/build';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);


const importFirebase = async () => {

    const firebaseApp = await import('firebase/app');

    if (firebaseApp.getApps()?.length) {
        return firebaseApp.getApp();
    }
    return firebaseApp.initializeApp(firebase_config);
};


export const getFirebase = async () => {

    if (isBrowser) {

        const app = await importFirebase();
        const firestore =  await import('firebase/firestore');
        const firebaseAuth = await import('firebase/auth');

        const db = firestore.getFirestore(app);
        const auth = firebaseAuth.getAuth(app);

        return {
            app,
            db,
            auth
        };
    }

    return {
        app: null,
        db: null,
        auth: null
    };
};


