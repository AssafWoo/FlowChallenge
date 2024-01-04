import { combinePostData } from "../utils/combineData";
import { useComments } from "./useComments";
import { usePaginatedPosts } from "./usePosts";
import { useUsers } from "./useUsers";

export const useCombinedPostData = (page:number) => {
  const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = usePaginatedPosts(page, 15);
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
  const { data: comments, isLoading: isLoadingComments, isError: isErrorComments } = useComments();

  const isLoading = isLoadingPosts || isLoadingUsers || isLoadingComments;
  const isError = isErrorPosts || isErrorUsers || isErrorComments;

  const combinedData = !isLoading && !isError ? combinePostData(posts, users, comments) : null;

  return { combinedData, isLoading, isError };
};
