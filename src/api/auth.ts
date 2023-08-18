import { BACKEND_URL } from 'src/config/config';
import { apiRoutes } from 'src/routes/pageRoutes';
import { useFetch, usePost } from 'src/utils/reactQuery';

export const usePostRefreshToken = () =>
  usePost<{ refreshToken: string }, any>(`${BACKEND_URL}/auth/refresh-tokens`);

export const usePostChangeStatus = () =>
  usePost<
    {
      userName: string;
      status: boolean;
    },
    any
  >(`${BACKEND_URL}/auth/change-status`);

export const usePostChangePassword = () =>
  usePost<
    {
      userId: string;
      newPassword: string;
      manager: string;
      currentPassword: string;
    },
    any
  >(`${BACKEND_URL}/auth/change-password`);

export const usePostLoginUser = () =>
  usePost<{ userName: string; password: string; logonAddress: string }, any>(
    `${BACKEND_URL}${apiRoutes.login}`
  );
