import { Post, User, Comment } from '../types/types';

export const combinePostData = (
  posts: Post[],
  users: User[],
  comments: Comment[]
) => {
// Future - possible extract those to map function to their own functions
  const userMap = new Map(users?.map(user => [user.id, user]));
  const commentCountMap = new Map<number, number>();

// Explain - Iterate through each comment to populate the comment count map
  comments?.forEach(comment => {
    commentCountMap.set(comment.postId, (commentCountMap.get(comment.postId) || 0) + 1);
  });

  // Explain - Transform the posts array with additional data from users and comment counts
  return posts?.map(post => {
    const user = userMap.get(post.userId);
    const commentsCount = commentCountMap.get(post.id) || 0;

    return {
      ...post,
      userName: user?.username,
      userCompany: user?.company.name,
      comments: commentsCount,
    };
  });
};
