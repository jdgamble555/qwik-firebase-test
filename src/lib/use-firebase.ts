import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup as _signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared } from './use-shared';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

// initialize firebase

const _useFirebase = () => {

    const app = getApps().length
        ? getApp()
        : initializeApp(firebase_config);

    const auth = getAuth(app);
    const db = getFirestore(app);

    return {
        auth,
        db,
        app
    };
};

export const useFirebase = () => useShared('firebase', _useFirebase);
