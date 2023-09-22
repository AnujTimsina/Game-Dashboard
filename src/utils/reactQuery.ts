import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';
import {
  BackendQueryResponse,
  GetInfinitePagesInterface,
} from 'src/interfaces';
import { api } from './api';
import { QueryFunctionContext } from 'react-query';

type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return api
    .get<T>(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
};

export const useLoadMore = <T>(url: string | null, params?: object) => {
  const context = useInfiniteQuery<
    GetInfinitePagesInterface<T>,
    Error,
    GetInfinitePagesInterface<T>,
    QueryKeyT
  >(
    [url!, params],

    ({ queryKey, pageParam = 1, meta }) =>
      fetcher({ queryKey, pageParam, meta }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : false;
      },
      getPreviousPageParam: (firstPage) => {
        return firstPage.page > 1 ? firstPage.page - 1 : false;
      },
    }
  );

  return context;
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
      [url!, params],
      ({ queryKey, meta }) => fetcher({ queryKey, meta })
    );
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<
    BackendQueryResponse<T>,
    Error,
    BackendQueryResponse<T>,
    QueryKeyT
  >
) => {
  const context = useQuery<
    BackendQueryResponse<T>,
    Error,
    BackendQueryResponse<T>,
    QueryKeyT
  >([url!, params], ({ queryKey, meta }) => fetcher({ queryKey, meta }), {
    enabled: !!url,
    ...config,
  });

  return context;
};

// const useGenericMutation = <T, S>(
//   func: (data: T | S) => Promise<AxiosResponse<S>>,
//   url: string,
//   params?: object,

//   updater?: ((oldData: T, newData: S) => T) | undefined
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation<AxiosResponse, AxiosError, T | S>(func, {
//     onMutate: async (data) => {
//       await queryClient.cancelQueries([url!, params]);

//       const previousData = queryClient.getQueryData([url!, params]);

//       queryClient.setQueryData<T>([url!, params], (oldData) => {
//         return updater ? updater(oldData!, data as S) : (data as T);
//       });

//       return previousData;
//     },
//     onError: (err, _, context) => {
//       queryClient.setQueryData([url!, params], context);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries([url!, params]);
//     },
//   });
// };

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  queryKey: [string, object?],
  invalidateKeys?: [string, object?][],
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(queryKey);

      const previousData = queryClient.getQueryData<T>(queryKey);

      queryClient.setQueryData<T>(queryKey, (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);

      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries(key);
        });
      }
    },
  });
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  invalidateKeys?: [string, object?][],
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    [url, params],
    invalidateKeys,
    updater
  );
};

export const useDelete = <T>(
  url: string,
  params?: object,
  invalidateKeys?: [string, object?][],
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    [url, params],
    invalidateKeys,
    updater
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  invalidateKeys?: [string, object?][],

  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data),
    [url, params],
    invalidateKeys,
    updater
  );
};
