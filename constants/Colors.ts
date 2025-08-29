/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#2ecc40'; // Green shade for light mode
const tintColorDark = '#27ae60'; // Green shade for dark mode

export const Colors = {
  light: {
    text: '#14532d', // Dark green for text
    background: '#c8d5c9', // Light green background
    tint: tintColorLight,
    icon: '#388e3c', // Medium green for icons
    tabIconDefault: '#388e3c',
    tabIconSelected: tintColorLight,
    button: '#43a047', // Vibrant green for buttons
    header: '#14532d', // Medium green for headers
    statusBar: '#388e3c', // Green for status bar
  },
  dark: {
    text: '#e8f5e9', // Light green for text
    background: '#14532d', // Dark green background
    tint: tintColorDark,
    icon: '#27ae60', // Green for icons
    tabIconDefault: '#27ae60',
    tabIconSelected: tintColorDark,
    button: '#27ae60', // Vibrant green for buttons
    header: '#14532d', // Dark green for headers
    statusBar: '#27ae60', // Green for status bar
  },
};
