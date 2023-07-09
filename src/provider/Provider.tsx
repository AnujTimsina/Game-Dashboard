import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import theme from '../theme';
import { BrowserRouter } from 'react-router-dom';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Provider;
