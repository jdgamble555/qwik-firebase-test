import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { useUser } from '~/lib/use-user';

export default component$(() => {

  const user = useUser();

  return (
    <>
      <Slot />
      <nav class="flex gap-3 justify-center mt-5">
        <Link href="/">Home</Link>
        {user.data && <Link href="/about">About</Link>}
      </nav>
    </>
  );
});