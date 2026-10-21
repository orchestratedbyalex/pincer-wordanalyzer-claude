import { createTheme } from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';

// MUI v4 computes with palette colors (fade, darken, getContrastText) and throws on var(),
// so the palette stays at MUI's defaults and every component is restyled through overrides
// that read the tokens defined in index.css. No color value lives in this file.
const ink = 'var(--color-ink)';
const inkMuted = 'var(--color-ink-muted)';
const page = 'var(--color-page)';
const rule = 'var(--color-rule)';
const wash = 'var(--color-ink-wash)';
const fieldBorder = 'var(--color-field-border)';
const focusRing = { outline: `2px solid ${ink}`, outlineOffset: 3 };

const systemFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"SF Pro Text"',
  '"SF Pro Display"',
  '"Segoe UI"',
  'sans-serif',
].join(',');

const theme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: systemFontFamily,
    button: {
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableElevation: true,
    },
    MuiPaper: {
      elevation: 0,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: page,
          color: ink,
        },
      },
    },
    MuiButton: {
      root: {
        minHeight: 44,
        padding: '10px 22px',
        color: ink,
        borderRadius: 'var(--radius-control)',
        transition: 'background-color 180ms ease, color 180ms ease, border-color 180ms ease',
        '&:hover': {
          backgroundColor: wash,
        },
        '&:focus-visible': focusRing,
        '&$disabled': {
          color: inkMuted,
          cursor: 'not-allowed',
          pointerEvents: 'auto',
        },
      },
      contained: {
        color: page,
        backgroundColor: ink,
        '&:hover': {
          backgroundColor: ink,
          opacity: 0.88,
        },
        '&$disabled': {
          color: inkMuted,
          backgroundColor: 'transparent',
          border: `1px solid ${rule}`,
        },
      },
      containedPrimary: {
        color: page,
        backgroundColor: ink,
        '&:hover': {
          backgroundColor: ink,
        },
      },
      outlined: {
        color: ink,
        border: `1px solid ${ink}`,
        '&$disabled': {
          border: `1px solid ${rule}`,
        },
      },
      outlinedPrimary: {
        color: ink,
        border: `1px solid ${ink}`,
        '&:hover': {
          border: `1px solid ${ink}`,
          backgroundColor: wash,
        },
      },
      textPrimary: {
        color: ink,
        '&:hover': {
          backgroundColor: wash,
        },
      },
    },
    MuiInputBase: {
      root: {
        color: ink,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 'var(--radius-box)',
        backgroundColor: 'transparent',
        '&:hover $notchedOutline': {
          borderColor: ink,
        },
        '&$focused $notchedOutline': {
          borderColor: ink,
          borderWidth: 2,
        },
      },
      notchedOutline: {
        borderColor: fieldBorder,
      },
    },
    MuiFormLabel: {
      root: {
        color: inkMuted,
        '&$focused': {
          color: ink,
        },
      },
    },
    MuiPaper: {
      root: {
        color: ink,
        backgroundColor: 'transparent',
      },
      rounded: {
        borderRadius: 0,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: rule,
      },
    },
    MuiListItem: {
      button: {
        borderRadius: 'var(--radius-control)',
        '&:hover': {
          backgroundColor: wash,
        },
        '&:focus-visible': { ...focusRing, outlineOffset: -2 },
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: inkMuted,
      },
    },
    MuiCircularProgress: {
      root: {
        color: ink,
      },
    },
  },
});

export default theme;
