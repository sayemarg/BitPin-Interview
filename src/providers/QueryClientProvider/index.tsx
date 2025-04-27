import { PropsWithChildren } from 'react';
import { QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api';

export const QueryClientProvider = ({ children }: PropsWithChildren) => (
  <ReactQueryClientProvider client={queryClient}>
    {children}

    <ReactQueryDevtools position="left" buttonPosition="bottom-left" initialIsOpen={false} />
  </ReactQueryClientProvider>
);
