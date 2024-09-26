import type { RequestHandler } from "@builder.io/qwik-city";
import { doc, getDoc } from "firebase/firestore/lite";
import { firebaseServer } from "~/lib/firebase-lite";

export const onPost: RequestHandler = async ({ request, json, text }) => {

    // login with token
    const { serverAuth, serverDB } = await firebaseServer(request);


    // get about document
    const aboutSnap = await getDoc(
        doc(serverDB, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    if (serverAuth.currentUser) {

        json(200, {
            data: aboutSnap.data() as AboutDoc
        });
        return;
    }
    text(401, 'Invalid Token');

};

