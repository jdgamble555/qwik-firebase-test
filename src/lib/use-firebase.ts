import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup as _signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useShared, useSharedSignal } from './use-shared';
import { isBrowser } from '@builder.io/qwik/build';
import { useSignal } from '@builder.io/qwik';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

// initialize firebase

export const useFirebase = () => {

    useSignal({
        app: null,
        auth: null,
        db: null
    })

    const loaded = useFirebaseLoaded();



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

export const useFirebaseLoaded = () => useSharedSignal('firebase', false);
