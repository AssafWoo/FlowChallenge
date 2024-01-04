import { useAllPosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";

// Future - design the whole page differently, complete the statistics page.
const Statistics = () => {
    const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useAllPosts();
    const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
  
  return (
    <div>
      <h1>Statistics</h1>
      {isLoadingPosts || isLoadingUsers ? (
        <div>Loading...</div>
      ) : isErrorPosts || isErrorUsers  ? (
        <div>Error loading data</div>
      ) : (
        <div>
          <p>Total number of posts: {posts.length}</p>
          <p>Total number of users: {users.length}</p>
         
        </div>
      )}
    </div>
  );
};

export default Statistics;
