const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#FBF9F9',
  neutral300: '#EDEAEA',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#3d3d3d',
  neutral900: '#000000',

  pink: '#FB2E86',
  red: '#FB2448',
  blue: '#4C1D95',
  offNavyBlue: '#3F509E',
  navyBlue: '#151875',
  purple: '#7E33E0',
  offPurple: '#9F63B5',
  skyBlue: '#F3F9FF',
  pantonePurple: '#E0D3F5',
  darkBlue: '#0D0E43',
  darkGray: '#222',
  gray: '#aaa',
  lightGray: '#eee',
  darkGreen: '#0D3D29',
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  primary: palette.darkGreen,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.gray,
  /**
   * The default color of the screen background.
   */
  background: palette.darkGray,
  pageBackground: palette.lightGray,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.red,
}
