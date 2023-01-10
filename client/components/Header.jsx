import { ImInstagram, ImGithub, ImLinkedin2 } from 'react-icons/im';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function header() {
  const router = useRouter();
  const { data: session } = useSession();
  let userName = session.user.name;
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  return (
    <header className="bg-black">
      <title>Parv's Blog Page</title>
      <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        <div className="shrink w-80 sm:order-1">
          <a className="font-bold uppercase text-3xl text-white">
            <button onClick={() => router.push('/')}>Parv's Blog Page</button>
          </a>
        </div>
        <div className="shrink w-80 sm:order-2">
          <a className="font-bold uppercase text-2xl text-white">
            <button
              onClick={() =>
                router.push(`https:/www.github.com/${session.user.name}`)
              }
            >
              Welcome {userName}, Enjoy Reading
            </button>
          </a>
        </div>
        <div className="w-96 order-3 flex justify-center">
          <div className="flex gap-6">
            <a href="https://www.instagram.com/pparvjainn">
              <ImInstagram color="#888888" />
            </a>
            <a href="https://www.linkedin.com/in/parvj/">
              <ImLinkedin2 color="#888888" />
            </a>
            <a href="https://github.com/parv42069">
              <ImGithub color="#888888" />
            </a>
            <button
              className="border-4 border-white px-4 py-1 justify-center align-text-middle text-white"
              onClick={() => signOut()}
            >
              Sign Out {userName}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
