import { useQuery } from 'react-query';
import { fetchUsers } from '../api';

export const useUsers = () => {
  return useQuery('users', fetchUsers,{
    cacheTime: 600000,
    staleTime: 120000,
    retry: 3,
    retryDelay: 1000,
  });
};