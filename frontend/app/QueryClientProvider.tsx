'use client'

import {
  QueryClient,
  QueryClientProvider as QueryClientProviders,
} from "react-query";
const queryClient = new QueryClient();

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProviders client={queryClient}>{children}</QueryClientProviders>
  );
}

export default QueryClientProvider;
