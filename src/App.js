import './App.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const POSTS = [
  { id: 1, title: "POST 1" },
  { id: 2, title: "POST 2" }
]

function App () {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(2000).then(() => [...POSTS])
  })
  const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(2000).then(() => POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: () => {
      queryClient.refetchQueries(["posts"]);
    }
  })
  console.log(postsQuery.isRefetching);
  console.log(postsQuery.data);
  console.log(POSTS);
  console.log("-----------");

  if (postsQuery.isLoading) return <h1>Loading...</h1>
  if (postsQuery.isError) return <pre>{ JSON.stringify(postsQuery.error) }</pre>
  return (
    <div>
      {
        postsQuery.data.map(post => (
          <div key={ post.id }>
            { post.title }
          </div>
        ))
      }
      <button onClick={ () => newPostMutation.mutate("new post") }>Add new</button>
    </div>
  );
}

function wait (duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default App;
