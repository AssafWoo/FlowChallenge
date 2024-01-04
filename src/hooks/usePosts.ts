import { useQuery } from 'react-query';
import { fetchAllPosts, fetchPaginatedPosts } from '../api';

export const usePaginatedPosts = (page: number, limit: number) => {
  return useQuery(['posts', page, limit], () => fetchPaginatedPosts(page, limit),{
    cacheTime: 600000,

    staleTime: 120000,

    retry: 3,
    retryDelay: 1000,
  });
};

export const useAllPosts = () => {
  return useQuery('posts', fetchAllPosts);
};
