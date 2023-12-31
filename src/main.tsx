import React from 'react';
import { createRoot } from 'react-dom/client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import App from './App';
import './main.css';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<App />);
