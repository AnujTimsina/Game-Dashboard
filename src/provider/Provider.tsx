import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import theme from 'src/theme/theme';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
          {children}
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Provider;
