import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';

const queryClient = new QueryClient();

function Main() {
  return (
    <QueryClientProvider client={queryClient}>
        <App/>
        <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default Main