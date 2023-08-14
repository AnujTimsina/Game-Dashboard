import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'src/components/AuthProvider/AuthProvider';
import { Provider as ReduxProvider } from 'react-redux';
import theme from 'src/theme/theme';
import { store } from 'src/store';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default Provider;
