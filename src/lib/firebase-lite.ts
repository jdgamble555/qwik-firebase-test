import { deleteApp, getApp, getApps, initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

export const firebaseServer = async (request: Request) => {

    const authIdToken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (getApps()?.length) {
        const app = getApp();
        await deleteApp(app);
    }

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });

    const serverAuth = getAuth(serverApp);
    await serverAuth.authStateReady();

    const serverDB = getFirestore(serverApp);

    return {
        serverAuth,
        serverDB
    };
};