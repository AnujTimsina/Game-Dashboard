import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Text: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: '400',
    fontFamily: 'Open Sans',
    color: 'white',
  },
  // // Two sizes: sm and md
  // sizes: {
  //   xs: {
  //     fontSize: 'xs',
  //   },
  //   sm: {
  //     fontSize: 'sm',
  //   },
  //   md: {
  //     fontSize: 'md',
  //     px: 6, // <-- these values are tokens from the design system
  //     py: 4, // <-- these values are tokens from the design system
  //   },
  //   lg: {
  //     fontSize: 20,
  //     // px: 8,
  //     w: '100%',
  //     py: 8,
  //   },
  // },
  // // size={'lg'} variant={'solid'}
  // // bg={"btn"} width="100%" borderRadius={88} py={8}
  // variants: {
  //   outline: {
  //     color: 'text',
  //     fontFamily: 'Poppins',
  //     bg: 'default',
  //     size: 'sm',
  //     _focus: { outline: 'blue' },
  //     _hover: { bg: 'red' },
  //     boxShadow: '0 0 0 1px #0f61dda1',
  //   },
  //   outline2: {
  //     color: 'text',
  //     fontFamily: 'Poppins',
  //     bg: 'transparent',
  //     border: '2px solid',
  //     borderColor: 'btn',
  //     size: 'sm',
  //     _focus: { outline: 'none' },
  //     _hover: { bg: 'btn' },
  //     boxShadow: '0 0 0 1px #0f61dda1',
  //   },
  //   solid: {
  //     bg: 'btn',
  //     fontFamily: 'Poppins',
  //     color: 'text',
  //     _hover: { bg: 'btn' },
  //     _focus: { outline: 'none' },
  //   },
  //   default: {
  //     bg: 'default',
  //     color: 'text',
  //     fontFamily: 'Poppins',
  //     _active: { outline: 'none' },
  //     _focus: { outline: 'none' },
  //   },
  //   icon: {
  //     bg: 'gray.50',
  //     fontFamily: 'Poppins',
  //     size: 'sm',
  //     _focus: { outline: 'none' },
  //   },
  //   iconDarker: {
  //     bg: 'gray.400',
  //     fontFamily: 'Poppins',
  //     size: 'sm',
  //     _focus: { outline: 'none' },
  //   },
  //   iconOverFlow: {
  //     borderRadius: '50%',
  //     fontFamily: 'Poppins',
  //     bg: 'gray.100',
  //     padding: 0,
  //     size: 'xs',
  //     _focus: { outline: 'none' },
  //   },
  // },
  // // The default size and variant values
  // defaultProps: {
  //   size: 'sm',
  //   variant: 'default',
  // },
  variants: {
    cardMainContent: {
      color: '#FFF',
      fontFamily: 'Open Sans',
      fontSize: '1.563rem',
      fontStyle: 'normal',
    },

    cardSubContent: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'rgba(255, 255, 255, 0.75)',
    },
    dateContentValue: {
      color: 'rgba(255, 255, 255, 0.85)',
      fontFamily: 'Open Sans',
      fontSize: '0.75rem',
      fontStyle: 'normal',
      fontWeight: '400',
    },
    dateContent: {
      color: '#FFF',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: '700',
    },
  },
};
