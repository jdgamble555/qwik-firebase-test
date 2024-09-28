import { $, component$, useSignal } from "@builder.io/qwik";
import { getAbout } from "~/lib/use-fetch";


export default component$(() => {

    const about = useSignal<AboutDoc | null>(null);

    const fetchAbout = $(async () => {
        about.value = await getAbout();
    });

    return (
        <div class="text-center my-5">
            <button class="bg-blue-950 p-2 font-semibold text-white" onClick$={fetchAbout}>
                Load About with Token
            </button>
            {about.value && (
                <div class="my-5 flex items-center justify-center">
                    <div class="flex w-[400px] flex-col gap-3 border p-5">
                        <h1 class="text-3xl font-semibold">{about.value.name}</h1>
                        <p>{about.value.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
});