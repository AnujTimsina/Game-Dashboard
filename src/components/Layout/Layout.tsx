import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { Box, HStack } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Navbar>{children}</Navbar>
    </ErrorBoundary>
  );
}
