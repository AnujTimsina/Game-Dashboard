import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyleTrack = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    bg: `${c}.200`,
    _checked: {
      bg: `${c}.200`,
    },
    _dark: {
      bg: `${c}.900`,
      _checked: {
        bg: `${c}.900`,
      },
    },
  };
});

// const baseStyle = definePartsStyle((props) => ({
//   // define the part you're going to style
//   container: {
//     // ...
//   },
//   thumb: {
//     bg: "gray.100",
//     // let's also provide dark mode alternatives
//     _dark: {
//       bg: 'gray.900',
//     },
//   },
//   track: baseStyleTrack(props)
// }))

const boxy = definePartsStyle({
  track: {
    bg: 'yellowBg',
    // borderRadius: 'sm',
    p: 1,
  },
  container: {},
  thumb: { bg: 'white' },
});

const switchTheme = defineMultiStyleConfig({ variants: { boxy } });

export default switchTheme;
