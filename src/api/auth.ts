import { BACKEND_URL } from 'src/config/config';
import { apiRoutes } from 'src/routes/pageRoutes';
import { usePost } from 'src/utils/reactQuery';

export const usePostRefreshToken = () =>
  usePost<{ refreshToken: string }, any>(`${BACKEND_URL}/auth/refresh-tokens`);

export const usePostChangeStatus = (id: string, page: number) => {
  return usePost<any, any>(`${BACKEND_URL}/auth/change-status`, undefined, [
    [
      `${BACKEND_URL}/users/${id}/subUsers`,
      {
        limit: 6,
        page: page,
      },
    ],
  ]);
};

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
