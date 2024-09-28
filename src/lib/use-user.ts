import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { User } from 'firebase/auth';
import { useShared } from './use-shared';
import { getUser, login } from './use-firebase';
import { isBrowser } from '@builder.io/qwik/build';


export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export const loginWithGoogle = async () => {
    if (isBrowser) {
        await login();
    }
};

export const logout = async () => {
    if (isBrowser) {
        await logout();
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

        getUser().then(({ auth, onAuthChange }) => {

            // toggle loading
            _store.loading = true;

            if (!isBrowser) {
                return;
            }

            // server environment
            if (!auth) {
                _store.loading = false;
                _store.data = null;
                return;
            }

            // subscribe to user changes
            return onAuthChange(auth, (_user: User | null) => {

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
    });

    return _store;
};

export const useUser = () => useShared('user', _useUser);
