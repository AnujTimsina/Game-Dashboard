import { BACKEND_URL } from 'src/config/config';
import { useFetch, usePost } from 'src/utils/reactQuery';

export const usePostRefreshToken = () =>
  usePost<{ refreshToken: string }, any>(`${BACKEND_URL}/auth/refresh-tokens`);
