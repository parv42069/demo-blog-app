import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { GET_POST } from '../queries/postQueries';
import { UPDATE_POST } from '../mutations/postMutations';
import Header from './Header';
function EditPostForm({ post, show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = () => {
    onClose();
  };

  const [updatePost] = useMutation(UPDATE_POST, {
    variables: { id: post.id, title, content, genre },
    refetchQueries: [{ query: GET_POST, variables: { id: post.id } }],
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !genre) {
      handleCloseClick();
      return alert('Taking default original values');
    }
    updatePost(title, content, genre);
    setContent('');
    setGenre('');
    setTitle('');
    handleCloseClick();
  };
  if (show) {
    return (
      <>
        <Header />
        <h3 className="flex font-bold uppercase text-3xl text-black mx-10 justify-center">
          Update Blog
        </h3>
        <div className="flex flex-col w-[95vw] h-[95vh] justify-center items-center">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="font-bold uppercase text-2xl text-black mx-10 block">
                Title
              </label>
              <input
                type="text"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-30 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mx-20"
                id="title"
                defaultValue={post.title}
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
                defaultValue={post.genre}
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
                defaultValue={post.content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
              >
                Submit
              </button>
              <button
                type="submit"
                className="border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
                onClick={() => handleCloseClick()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EditPostForm;
