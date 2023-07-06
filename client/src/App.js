import { useState } from 'react';
import './App.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostsList1 from './PostList1';
import PostsList2 from './PostList2';
import Post from './Post';
import { CreatePost } from './CreatePost';
import { PostListPaginated } from './PostListPaginated';
import { PostListInfinite } from './PostListInfinite';
import { getPost } from './api/posts';

function App () {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();
  function onHoverPostOneLink () {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }
  return (
    <div>
      <button onClick={ () => setCurrentPage(<PostsList1 />) }>
        PostList1
      </button>
      <button onClick={ () => setCurrentPage(<PostsList2 />) }>
        PostList2
      </button>
      <button onMouseEnter={ onHoverPostOneLink } onClick={ () => setCurrentPage(<Post id={ 1 } />) }>
        Post
      </button>
      <button onClick={ () => setCurrentPage(<CreatePost setCurrentPage={ setCurrentPage } />) }>
        New Post
      </button>
      <button onClick={ () => setCurrentPage(<PostListPaginated />) }>
        Post List Paginated
      </button>
      <button onClick={ () => setCurrentPage(<PostListInfinite />) }>
        Post List Infinite
      </button>
      <br />
      { currentPage }
    </div>
  )
}
export default App;
