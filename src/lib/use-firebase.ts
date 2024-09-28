import { isBrowser } from '@builder.io/qwik/build';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

        const db = getFirestore(app);
        const auth = getAuth(app);

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


