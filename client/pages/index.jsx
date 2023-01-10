import { useState } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import AddPostModal from '../components/AddPostModal';
import { useSession, signIn, signOut } from 'next-auth/react';

function Home() {
  const { data: session } = useSession();
  const [newBlogShowModal, setnewBlogShowModal] = useState(false);
  return (
    <>
      {!session && (
        <>
          <div className="flex flex-col w-[95vw] h-[95vh] justify-center items-center">
            <p>Please Sign In first to view the contents of this Website</p>
            <br />
            <button
              className="border-4 border-black px-4 py-1 justify-center align-text-middle"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        </>
      )}
      {!newBlogShowModal && session && (
        <>
          <Header />
          <button
            className="border-4 border-black px-4 py-1 justify-center align-text-middle"
            onClick={() => setnewBlogShowModal(true)}
          >
            New Blog
          </button>
          <Posts />
        </>
      )}
      {newBlogShowModal && session && (
        <>
          <Header />
          <AddPostModal
            onClose={() => setnewBlogShowModal(false)}
            show={newBlogShowModal}
          />
        </>
      )}
    </>
  );
}

export default Home;
