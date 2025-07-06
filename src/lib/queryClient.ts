import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: (error) => {
        // TODO: surface toast once shadcn/toaster util exists
        console.error(error);
      },
    },
  },
});
