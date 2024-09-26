import { $, component$, useStore } from "@builder.io/qwik";
import { getAuth } from "firebase/auth";
import { app } from "~/lib/firebase";

export default component$(() => {

    const state = useStore<{ data: AboutDoc | null }>({ data: null });

    const fetchData = $(async () => {

        const auth = getAuth(app);

        if (!auth.currentUser) {
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
            return;
        }

        const s = await result.json();

        state.data = s.data;
    });

    return (
        <div class="text-center my-5">
            <button class="bg-blue-950 p-2 font-semibold text-white" onClick$={fetchData}>
                Load About with Token
            </button>
            {state.data && (
                <div class="my-5 flex items-center justify-center">
                    <div class="flex w-[400px] flex-col gap-3 border p-5">
                        <h1 class="text-3xl font-semibold">{state.data.name}</h1>
                        <p>{state.data.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
});