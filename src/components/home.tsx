import { component$ } from "@builder.io/qwik";
import { useUser } from "~/lib/use-user";
import Profile from "./profile";
import { Loading, Login } from "./helpers";

export default component$(() => {

  const user = useUser();

  return (
    <div class="text-center">
      <h1 class="text-3xl font-semibold my-3">Qwik Firebase Test</h1>
      {user.loading ? <Loading /> : user.data ? <Profile /> : <Login />}
    </div>
  );
});

