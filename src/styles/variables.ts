/* eslint-disable max-len */

export const colors = {
  brand: '#663399', // Primary, default header and links
  yellow: 'rgb(241,217,29)', // JavaScript Brand Yellow
  blue: 'rgb(24,122,191)', // TypeScript Brand Blue
  purple: 'rgb(102, 51,153)', // Gatsby Brand Purple
  green: 'rgb(104, 159, 99)', // Node JS Brand Green
  pink: 'rgb(229,53,171)', // GraphQL Brand Pink
  orange: 'rgb(241,101,41)', // HTML5 Brand Orange
  red: 'rgb(204,52,45)', // Ruby Brand Red
  teal: 'rgb(94,211,243)', // React Brand Teal
  ui: {
    terminal: 'rgb(30, 34, 41)', // Terminal Background
    traffic: { // Terminal close buttons
      red: 'rgb(236, 97, 86)',
      yellow: 'rgb(246, 193, 81)',
      green: 'rgb(99, 199, 86)'
    }
  },
  code: 'rgb(254, 125, 232)', // Default code/pre color
  white: '#fff', // Used in header component, with polished
  black: '#000' // Body text color, heading and strong reset
}

export const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace'
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

export const widths = {
  md: 720,
  lg: 960,
  xl: 1140
}

export const dimensions = {
  fontSize: {
    regular: 16,
    large: 18
  },
  headingSizes: {
    h1: 2.441,
    h2: 1.953,
    h3: 1.563,
    h4: 1.25
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2
  },
  containerPadding: 1.5
}

export const heights = {
  header: 60
}
