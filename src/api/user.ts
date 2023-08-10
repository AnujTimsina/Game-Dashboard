import { BACKEND_URL } from 'src/config/config';
import { Transaction } from 'src/interfaces/transaction';
import { IUser, PageData } from 'src/interfaces/user';
import { apiRoutes } from 'src/routes/pageRoutes';
import { useFetch, useLoadMore } from 'src/utils/reactQuery';

export const useGetSubUsers = (id: string, page: number) =>
  useFetch<IUser[]>(`${BACKEND_URL}/users/${id}/subUsers`, {
    limit: 6,
    page: page,
  });

export const useGetUserTransactions = (
  id: string,
  page: number,
  type: number
) =>
  useFetch<Transaction[]>(`${BACKEND_URL}/transactions/${id}`, {
    type: type,
    limit: 8,
    page: page,
    populate: 'actionBy,actionTo',
  });

export const useGetUser = (id: string) =>
  useFetch<IUser>(`${BACKEND_URL}/users/${id}`);
