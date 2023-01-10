import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GET_POST } from '../../queries/postQueries';
import Spinner from '../../components/Spinner';
import DeletePostButton from '../../components/DeletePostButton';
import EditPostForm from '../../components/EditPostForm';
import { useQuery } from '@apollo/client';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

import Header from '../../components/Header';
const mongoose = require('mongoose');

const Post = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [postId, setPostId] = useState(null);
  const [editBlogShowModal, setEditBlogShowModal] = useState(false);

  useEffect(() => {
    if (router.asPath !== router.route) {
      setPostId(router.query.postId);
    }
  }, [router]);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId },
  });
  if (loading) return <Spinner />;
  if (error) return <p> Something Went Wrong</p>;

  if (data) {
    if (!session) {
      router.push('/');
    }
    if (data.post.genre === 'tech') {
      return (
        <>
          {!editBlogShowModal && session && (
            <>
              <Header />
              <div
                style={{
                  backgroundImage: `url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?w=2000&t=st=1673252262~exp=1673252862~hmac=5bdf02e69de94b04588c45910aea6a1a961a940898efb2e5a4102602182db398')`,
                  height: 880,
                }}
              >
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => router.push('/')}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => setEditBlogShowModal(true)}
                >
                  <FaEdit />
                </button>
                <p className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-black to-gray-600 px-20 py-10">
                  <strong>{data.post.title}</strong>
                </p>
                <p className="text-sm mx-20">
                  By: <strong>{data.post.author.name}, </strong>
                  <span className="text-xs">{data.post.author.email}</span>
                </p>
                <p className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-black to-gray-600 px-10">
                  {data.post.content}
                </p>
                <br></br>
                <DeletePostButton postId={data.post.id} />
              </div>
            </>
          )}
          {editBlogShowModal && session && (
            <>
              <EditPostForm
                post={data.post}
                show={editBlogShowModal}
                onClose={() => setEditBlogShowModal(false)}
              />
            </>
          )}
        </>
      );
    }
    if (data.post.genre === 'politics') {
      return (
        <>
          {!editBlogShowModal && session && (
            <>
              <Header />
              <div
                style={{
                  backgroundImage: `url('https://img.freepik.com/free-vector/concept-protest-revolution-conflict_1325-267.jpg?w=1800&t=st=1673252977~exp=1673253577~hmac=4d97b138805ce82b9416d143fcf03d315ffa278151d59d99a2629c8559f606cc')`,
                  height: 880,
                }}
              >
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => router.push('/')}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => setEditBlogShowModal(true)}
                >
                  <FaEdit />
                </button>
                <p className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-black to-gray-600 px-20 py-10">
                  <strong>{data.post.title}</strong>
                </p>
                <p className="text-sm mx-20">
                  By: <strong>{data.post.author.name}, </strong>
                  <span className="text-xs">{data.post.author.email}</span>
                </p>
                <br></br>
                <br></br>
                <p className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-blue-400 to-blue-800 px-10">
                  {data.post.content}
                </p>
                <br></br>
                <DeletePostButton postId={data.post.id} />
              </div>
            </>
          )}
          {editBlogShowModal && session && (
            <>
              <EditPostForm
                post={data.post}
                show={editBlogShowModal}
                onClose={() => setEditBlogShowModal(false)}
              />
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {!editBlogShowModal && session && (
            <>
              <Header />
              <div
                style={{
                  backgroundImage: `url('https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?w=1800&t=st=1673253497~exp=1673254097~hmac=8e0ad3d94d365feb5e876ec31bdb23f3f726206d383db6ebbc400a16779a6572')`,
                  height: 880,
                }}
              >
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => router.push('/')}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="float-right mx-10 my-10 border-4 border-black justify-center align-text-middle py-2 px-4 rounded"
                  onClick={() => setEditBlogShowModal(true)}
                >
                  <FaEdit />
                </button>
                <p className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-black to-gray-600 px-20 py-10">
                  <strong>{data.post.title}</strong>
                </p>
                <p className="text-sm mx-20">
                  By: <strong>{data.post.author.name}, </strong>
                  <span className="text-xs">{data.post.author.email}</span>
                </p>
                <br></br>
                <br></br>
                <p className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-white to-black px-10">
                  {data.post.content}
                </p>
                <br></br>
                <DeletePostButton postId={data.post.id} />
              </div>
            </>
          )}
          {editBlogShowModal && session && (
            <>
              <EditPostForm
                post={data.post}
                show={editBlogShowModal}
                onClose={() => setEditBlogShowModal(false)}
              />
            </>
          )}
        </>
      );
    }
  }
};

export default Post;
