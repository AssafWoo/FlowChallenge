import { useQuery } from 'react-query';
import { fetchComments } from '../api';

export const useComments = () => {
  return useQuery('comments', fetchComments,{
    cacheTime: 600000,

    staleTime: 120000,

    retry: 3,
    retryDelay: 1000,
  });
};