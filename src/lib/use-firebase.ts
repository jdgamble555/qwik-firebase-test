import { isBrowser } from '@builder.io/qwik/build';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

type FirebaseType = {
    app: FirebaseApp | null;
    db: Firestore | null;
    auth: Auth | null;
}


export const getFirebase = () => {

    if (isBrowser) {
        // initialize firebase
        const app = getApps().length
            ? getApp()
            : initializeApp(firebase_config);

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


