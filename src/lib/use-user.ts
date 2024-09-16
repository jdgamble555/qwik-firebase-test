import { useStore, $, useVisibleTask$, noSerialize } from '@builder.io/qwik';
import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { useFirebase } from './use-firebase';
import { useShared } from './use-shared';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export const useAuth = () => {

    const { auth } = useFirebase();

    return {
        login: $(async () => {
            if (!auth) {
                return;
            }
            await signInWithPopup(
                auth,
                new GoogleAuthProvider()
            );
        }),
        logout: $(async () => {
            if (!auth) {
                return;
            }
            await signOut(auth);
        })
    };
};

export function _useUser() {

    const fb = useFirebase();

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

        // server environment
        if (!fb.auth) {
            _store.loading = false;
            _store.data = null;
            return;
        }

        // subscribe to user changes
        return onIdTokenChanged(fb.auth, (_user: User | null) => {

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
