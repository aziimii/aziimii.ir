import { createTheme } from '@mui/material/styles'

/** Design tokens mirrored from src/styles/global.css. */
export const tokens = {
  bg: '#0D1117',
  surface: '#161B22',
  surfaceAlt: '#1C2128',
  text: '#F0F6FC',
  textSecondary: '#8B949E',
  primary: '#58A6FF',
  success: '#3FB950',
  accent: '#D2A8FF',
  border: '#30363D',
  borderStrong: '#484F58',
  danger: '#F85149',
  warning: '#D29922',
} as const

const mono = "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
const sans = "'Inter Variable', Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.primary, contrastText: tokens.bg },
    secondary: { main: tokens.accent, contrastText: tokens.bg },
    success: { main: tokens.success, contrastText: tokens.bg },
    error: { main: tokens.danger },
    warning: { main: tokens.warning },
    info: { main: tokens.primary },
    background: { default: tokens.bg, paper: tokens.surface },
    text: { primary: tokens.text, secondary: tokens.textSecondary },
    divider: tokens.border,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: sans,
    h1: {
      fontFamily: sans,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.12,
    },
    h2: {
      fontFamily: sans,
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: sans,
      fontWeight: 650,
      letterSpacing: '-0.01em',
      lineHeight: 1.25,
    },
    h4: { fontFamily: sans, fontWeight: 650, lineHeight: 1.3 },
    h5: { fontFamily: sans, fontWeight: 600, lineHeight: 1.35 },
    h6: { fontFamily: sans, fontWeight: 600, lineHeight: 1.4 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.925rem', lineHeight: 1.65 },
    subtitle1: { fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.5 },
    caption: {
      fontFamily: mono,
      fontSize: '0.75rem',
      letterSpacing: '0.02em',
      color: tokens.textSecondary,
    },
    overline: {
      fontFamily: mono,
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.12em',
      color: tokens.textSecondary,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: sans,
    },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 18,
          paddingBlock: 9,
          transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',
        },
        sizeSmall: { paddingInline: 12, paddingBlock: 6 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: 10,
          boxShadow: 'none',
          transition: 'border-color 0.18s ease, transform 0.18s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontFamily: mono,
          fontSize: '0.72rem',
          letterSpacing: '0.01em',
          height: 26,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: tokens.surface,
          fontFamily: sans,
        },
        notchedOutline: { borderColor: tokens.border },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: tokens.surface,
          backgroundImage: 'none',
          borderLeft: `1px solid ${tokens.border}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: tokens.border } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: tokens.surfaceAlt,
          border: `1px solid ${tokens.border}`,
          fontFamily: mono,
          fontSize: '0.72rem',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: 'rgba(88, 166, 255, 0.28)',
          color: tokens.text,
        },
      },
    },
  },
})

export default theme
