import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { useShared } from './use-shared';
import { getFirebase } from './use-firebase';
import { isBrowser } from '@builder.io/qwik/build';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};


export const loginWithGoogle = async () => {
    const { auth } = getFirebase();
    if (isBrowser) {
        await signInWithPopup(auth, new GoogleAuthProvider());
    }    
};

export const logout = async () => {
    const { auth } = getFirebase();
    await signOut(auth);
};

export function _useUser() {

    const _store = useStore<{
        loading: boolean,
        data: userData | null
    }>({
        loading: true,
        data: null
    });

    useVisibleTask$(() => {

        const { auth } = getFirebase();

        // toggle loading
        _store.loading = true;

        // server environment
        if (!auth) {
            _store.loading = false;
            _store.data = null;
            return;
        }

        // subscribe to user changes
        return onIdTokenChanged(auth, (_user: User | null) => {

            _store.loading = false;

            if (!_user) {
                _store.data = null;
                return;
            }

            // map data to user data type
            const { photoURL, uid, displayName, email } = _user;
            const data = { photoURL, uid, displayName, email };

            // print data in dev mode
            if (import.meta.env.DEV) {
                console.log(data);
            }

            // set store
            _store.data = data;
        });

    });

    return _store;
};

export const useUser = () => useShared('user', _useUser);
