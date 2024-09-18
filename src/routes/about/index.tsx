import type { RequestHandler } from "@builder.io/qwik-city";
import { getAuth } from "firebase/auth";

export const onGet: RequestHandler = async ({ json }) => {

    // auth problem
    getAuth();

    json(200, { hello: 'world' });
};