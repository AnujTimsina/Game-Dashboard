import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from 'src/components/AuthProvider/AuthProvider';
import theme from 'src/theme/theme';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      {/* <BrowserRouter> */}
      <AuthProvider>
        <ChakraProvider theme={theme}>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          {children}
        </ChakraProvider>
      </AuthProvider>
      {/* </BrowserRouter> */}
    </React.StrictMode>
  );
};

export default Provider;
