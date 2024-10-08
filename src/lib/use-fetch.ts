import { isBrowser } from "@builder.io/qwik/build";
import { getFirebase } from "./use-firebase";


export const getAbout = async () => {

    if (isBrowser) {

        const { auth } = await getFirebase();

        if (!auth?.currentUser) {
            throw 'Not Logged in!';
        }

        const token = await auth.currentUser.getIdToken();

        const result = await fetch('/about/', {
            method: 'POST',
            body: '',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!result.ok) {
            const e = await result.json();
            console.error(e);
            return null;
        }

        const about = await result.json();

        return about.data as AboutDoc;
    }

    return null;
};
