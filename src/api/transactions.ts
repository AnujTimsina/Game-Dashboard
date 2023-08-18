import { BACKEND_URL } from 'src/config/config';
import { apiRoutes } from 'src/routes/pageRoutes';
import { usePost } from 'src/utils/reactQuery';

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
