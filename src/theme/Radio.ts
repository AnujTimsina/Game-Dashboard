import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style

  control: {
    borderColor: 'rgba(30, 30, 30, 0.35)',

    _checked: {
      background: 'blueBg',
      borderColor: 'transparent',
      color: 'white',
    },
  },
});

// define custom variant
const variants = {
  groove: definePartsStyle({
    control: {
      borderRadius: 0,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'purple.500',
      background: 'purple.500',

      _checked: {
        background: 'purple.500',
        borderColor: 'purple.500',

        _hover: {
          bg: 'purple.700',
          borderColor: 'purple.700',
        },
      },
      _dark: {
        borderColor: 'purple.200',
        background: 'purple.200',

        _hover: {
          bg: 'purple.400',
          borderColor: 'purple.400',
        },
      },
      _hover: {
        bg: 'purple.700',
        borderColor: 'purple.700',
      },
    },
  }),
};

// export the component theme
const radioTheme = defineMultiStyleConfig({
  baseStyle,
  //   sizes,
  variants,
});

export default radioTheme;
