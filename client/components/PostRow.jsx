import { FaTrash } from 'react-icons/fa';

function PostRow({ post }) {
  return (
    <div className="bg-gray-100 shadow-xl p-4 w-full">
      <div className="">
        <div className="">
          <div className="flex justify-between align-items: center">
            <div>
              <strong className="text-lg">{post.title}</strong>
              <br></br>
              <span className="text-sm">
                Author: <strong>{post.author.name}</strong> Genre:{' '}
                <strong className="uppercase">{post.genre}</strong>
              </span>
            </div>
            <a href={`/post/${post.id}`}>
              <button className="border-4 border-black px-4 py-1 justify-center align-text-middle">
                Read
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRow;
