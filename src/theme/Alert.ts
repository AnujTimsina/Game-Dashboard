import { alertAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: {
    py: '5px',
  },
  // define the part you're going to style
  title: {
    color: 'red.400', // change the color of the title text of the alert
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'semibold',
  },
});

// Defining a custom variant called mono
const mono = definePartsStyle((props) => {
  const { status } = props;

  return {
    container: {
      p: '18px 25px',
      borderRadius: '10px',

      borderLeft: '7px solid #FFDA3A',
      bg: '#F5F7F9',
      //   border: '10px dashed',
      //   borderColor: status === 'error' ? 'red.400' : 'gray.100',
      //   _light: {
      //     bg: 'gray.200',
      //   },
    },
    title: {
      color: '#EA3323',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 600,
    },
    description: {
      fontFamily: 'mono',
    },
  };
});

const variants = {
  mono,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

const Alert = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: 'mono',
    colorScheme: 'blue',
  },
});

export default Alert;
