import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../mutations/postMutations';
import { ADD_AUTHOR } from '../mutations/authorMutations';
import { GET_POSTS } from '../queries/postQueries';
import { GET_AUTHOR, GET_AUTHORS } from '../queries/authorQueries';
import { useSession } from 'next-auth/react';

export default function AddPostModal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    onClose();
  };

  const [addPost] = useMutation(ADD_POST, {
    variables: { title, content, genre, authorId },
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [...posts, addPost] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { name: session.user.name, email: session.user.email },
    update(cache, { data: { addAuthor } }) {
      const { authors } = cache.readQuery({ query: GET_AUTHORS });
      cache.writeQuery({
        query: GET_AUTHORS,
        data: { authors: [...authors, addAuthor] },
      });
    },
  });
  if (show) {
    const onSubmit = (e) => {
      e.preventDefault();

      if (title === '' || content === '' || genre === '') {
        return alert('Please fill in all fields');
      }
      console.log(typeof authorId);
      addPost(title, content, genre, authorId);

      setTitle('');
      setGenre('');
      setContent('');
      setAuthorId('');
      handleCloseClick();
    };

    if (loading) return null;
    if (error) return 'Something Went Wrong';

    if (
      !loading &&
      !error &&
      !data.authors.find((author) => author.email === session.user.email)
    ) {
      addAuthor();
    }

    return (
      <>
        {!loading && !error && (
          <>
            <div>
              <div className="flex flex-col w-[95vw] h-[95vh] justify-center items-center">
                <div className="modal-content">
                  <div className="items-center justify-center">
                    <h5
                      className="font-bold uppercase text-3xl text-black mx-10"
                      id="addPostModalLabel"
                    >
                      New Blog
                    </h5>
                  </div>
                  <br></br>
                  <div className="modal-body">
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label className="font-bold uppercase text-2xl text-black mx-10 block">
                          Title:
                        </label>
                        <input
                          type="text"
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-30 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="font-bold uppercase text-2xl text-black mx-10 block">
                          Genre:
                        </label>
                        <input
                          type="text"
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-30 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                          id="genre"
                          value={genre}
                          onChange={(e) => setGenre(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="font-bold uppercase text-2xl text-black mx-10 block">
                          Content:
                        </label>
                        <textarea
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-64 h-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                          id="content"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label className="font-bold uppercase text-2xl text-black mx-10 block">
                          Author:
                        </label>
                        <select
                          id="authorId"
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                          value={authorId}
                          onChange={(e) => {
                            if (e) {
                              setAuthorId(e.target.value);
                            } else {
                              setAuthorId(user.id);
                            }
                          }}
                        >
                          <option value="">Select User</option>
                          {data.authors.map((author) => (
                            <option key={author.id} value={author.id}>
                              {author.email}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <button
                          type="submit"
                          data-bs-dismiss="modal"
                          className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
                        >
                          Submit
                        </button>
                        <button
                          type="submit"
                          onClick={() => handleCloseClick()}
                          className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
