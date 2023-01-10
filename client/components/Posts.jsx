import { gql, useQuery } from '@apollo/client';
import Spinner from './Spinner';
import PostRow from './PostRow';
import { useState } from 'react';
import { GET_POSTS, GET_POST } from '../queries/postQueries';

function getIndividualPostData(id) {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: id },
  });
  return data;
}

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <Spinner />;
  if (error) return <p> Something went wrong </p>;
  return (
    <>
      {!loading && !error && (
        <div className="flex justify-center">
          <div className="m-4 space-y-5 justify-center flex-col gap-20 w-1/3">
            {data.posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
