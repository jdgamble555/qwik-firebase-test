import { component$ } from '@builder.io/qwik';
import { useUser } from '~/lib/use-user';
import { Logout } from './helpers';
import About from './about';

export default component$(() => {

    const user = useUser();

    if (!user.data) {
        return;
    }

    const { displayName, photoURL, uid } = user.data;

    return (
        <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold">Hi {displayName}!</h3>
            <img src={photoURL || ''} width="100" height="100" alt="user avatar" />
            <p>Your userID is {uid}</p>
            <Logout />
            <About />
        </div>
    );
});


