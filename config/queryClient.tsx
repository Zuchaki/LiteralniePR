import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { QueryCache, QueryClient } from 'react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.silent) return;
      if (error instanceof AxiosError && error.response?.data?.detail)
        return toast.error(error.response?.data?.detail);
      toast.error('Coś poszło nie tak');
    },
  }),
});

export default queryClient;
