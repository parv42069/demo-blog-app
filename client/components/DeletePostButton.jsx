import { FaArchive } from 'react-icons/fa';
import { GET_POSTS } from '../queries/postQueries';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../mutations/postMutations';
import { useRouter } from 'next/router';

function DeletePostButton({ postId }) {
  const router = useRouter();
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: postId },
    onCompleted: () => router.push('/'),
    refetchQueries: [{ query: GET_POSTS }],
  });
  const deleteHandler = () => {
    var result = confirm('Delete');
    if (result) {
      deletePost();
    }
  };

  return (
    <div className="flex mt-5 mx-auto">
      <button
        className="h-14 border-4 border-black px-4 py-1 justify-center align-text-middle mx-40"
        onClick={() => deleteHandler()}
      >
        <FaArchive />
      </button>
    </div>
  );
}

export default DeletePostButton;
