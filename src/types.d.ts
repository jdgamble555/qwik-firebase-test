// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {

    type UserType = {
        displayName: string | null
        photoURL: string | null;
        uid: string;
        email: string | null;
    };

    type AboutDoc = {
        name: string;
        description: string;
    };

    type FirebaseType = {
        app: FirebaseApp | null;
        db: Firestore | null;
        auth: Auth | null;
    }

    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };