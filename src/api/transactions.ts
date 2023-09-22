import { BACKEND_URL } from 'src/config/config';
import { apiRoutes } from 'src/routes/pageRoutes';
import { useFetch, usePost } from 'src/utils/reactQuery';

export const usePostCreateTransaction = () =>
  usePost<
    {
      actionBy: string;
      actionTo: string;
      amount: number;
      type: number;
    },
    any
  >(`${BACKEND_URL}${apiRoutes.transactions}`);

export const useGetStats = () =>
  useFetch<any>(`${BACKEND_URL}/transactions/me/stats`);
