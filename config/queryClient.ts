import { AxiosError } from "axios";
import { MutationCache, QueryCache, QueryClient } from "react-query";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err, variables, _context, mutation) => {
      if (err instanceof AxiosError && err.response?.status === 401) return;
    },
  }),
  queryCache: new QueryCache({
    onError: (err, query) => {
      if (!query.meta?.silent)
        if (err instanceof AxiosError && err.response?.status === 401) return;
    },
  }),
});
