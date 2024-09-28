import { component$ } from "@builder.io/qwik";
import { loginWithGoogle, logout } from "~/lib/use-user";

export const Loading = () => {
    return <p>Loading...</p>;
};

export const Login = component$(() => {
    return <button type="button" class="border p-2 rounded-md text-white bg-red-600" onClick$={() => loginWithGoogle()}>
        Signin with Google
    </button>
});

export const Logout = component$(() => {
    return <p>
        <button type="button" class="border p-2 rounded-md text-white bg-lime-600" onClick$={() => logout()}>
            Logout
        </button>
    </p>;
});
