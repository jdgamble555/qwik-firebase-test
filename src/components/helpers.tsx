import { useAuth } from "~/lib/use-user";
import { component$ } from "@builder.io/qwik";

export const Loading = () => {
    return <p>Loading...</p>;
};

export const Login = component$(() => {
    const { login } = useAuth();
    return <button type="button" class="border p-2 rounded-md text-white bg-red-600" onClick$={() => login()}>
        Signin with Google
    </button>
});

export const Logout = component$(() => {

    const { logout } = useAuth();

    return <p>
        <button type="button" class="border p-2 rounded-md text-white bg-lime-600" onClick$={() => logout()}>
            Logout
        </button>
    </p>;
});
