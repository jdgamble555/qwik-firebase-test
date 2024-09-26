import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import {
    getAuth,
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { useShared } from './use-shared';
import { app } from './firebase';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export const loginWithGoogle = () => {
    if (isBrowser) {
        const auth = getAuth(app);
        signInWithPopup(auth, new GoogleAuthProvider());
    }    
};

export const logout = () => {
    if (isBrowser) {
        const auth = getAuth(app);
       signOut(auth); 
    }
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

        // toggle loading
        _store.loading = true;

        const auth = getAuth(app);

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
